const examplesDir = './src/'
const outputDir = './output/'

const path = require('path')
const childProcess = require('child_process')
const fs = require('fs-extra')
const glob = require('glob')
const nunjucks = require('nunjucks')
const express = require('express')
const showdown = require('showdown')

const app = express()
const expressWs = require('express-ws')(app)
app.use(express.static('public'))

nunjucks.configure('templates', {
  express: app,
  autoescape: true,
  noCache: true,
})

const converter = new showdown.Converter()
const markdown = text => converter.makeHtml(text)

let sockets = [];   // array of Websocket instances

// Get an array of all .re source files.
function getExamples() {
  return new Promise(resolve => {
    glob(examplesDir + '**/*.purs', (err, files) =>
      resolve(
        // Return the path relative from the examples directory
        files.map(
          x => x.substring(examplesDir.length))))
  })
}

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, (err, stdout, stderr) => {
      err ? reject(err) : resolve(stdout)
    })
  })
}

function getDescription(text) {
  // Get the contents of the top multiline comment (everything between /* and */)
  let groups = /^\{-([\s\S]*?)-\}/.exec(text.trim())

  if (groups === null) {
    return ''
  } else {
    return (groups[1])
  }
}

//***** ROUTES *****// 

// Serve the home page
app.get('/', async (req, res) => {
  res.render('index.html', {examples: await getExamples()})
})

// Serve up examples from the examples directory
app.get('/example/:name', async (req, res) => {
  try {
    let example = req.params.name
    let pursPath = path.join(examplesDir, example)
    let dirname = path.dirname(example)
    let basename = path.basename(example, '.purs')    
    let jsPath = path.join(examplesDir, dirname, basename + '.bs.js')
    // Read the file, error will be raised if it doesn't exist
    let text = await fs.readFile(pursPath, 'utf8')
    // let output = await runCommand('pulp run -m' + basename)
    let output = 'hello world'
    res.render('example.html', {
      example,
      output: output.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'),
      description: getDescription(text),
    })
  } catch (err) {
    // File doesn't exist, serve 404
    if (err.code === 'ENOENT') {
      res.status(404).send('No such example found')
    }
  }
})

app.ws('/reload', (ws, req) => {
  sockets.push(ws)
  ws.on('close', () => {
    sockets = sockets.filter(socket => socket !== ws)
  })
})

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('Your app is listening on port ' + listener.address().port)

  fs.watch(outputDir, {recursive: true}, (eventType, filename) => {
    if (eventType === 'change' && path.basename(filename) === 'index.js') {
      console.log(`Changed: ${filename}`)
      // sockets.forEach(socket => socket.send('reload'))
    }
  })
})