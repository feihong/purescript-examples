module HttpClient where

import Prelude

import Effect (Effect)
import Effect.Aff (Fiber, launchAff)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Network.HTTP.Affjax as AX
import Network.HTTP.Affjax.Response as AXRes

main :: Effect (Fiber Unit)
main = launchAff $ do
  let req = AX.defaultRequest { url = "http://ipecho.net/plain" }
  res <- AX.affjax AXRes.string req
  liftEffect $ log $ "Your IP address: " <> res.response
