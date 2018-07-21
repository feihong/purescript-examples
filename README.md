# Feihong's PureScript Examples

## Prerequisites

    yarn global add purescript pulp psc-package

## Commands

Build and run a particular program, e.g. RandomHanzi

    pulp run -m RandomHanzi

Install dependencies

    psc-package install

Install a particular package, e.g. purescript-strings

    psc-package install strings

Build and run on change

    pulp -w run

Build

    pulp build

Run tests

    pulp test

Start repl

    pulp repl
