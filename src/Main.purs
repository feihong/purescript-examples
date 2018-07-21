module Main where

import Prelude

import Effect (Effect, forE)
import Effect.Console (log)

main :: Effect Unit
main = do
  forE 1 10 \i -> log $ "Hello sailor!"
