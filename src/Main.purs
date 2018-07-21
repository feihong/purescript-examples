module Main where

import Prelude

import Effect (Effect, forE)
import Effect.Console (log, logShow)
import Effect.Random (randomInt)

main :: Effect Unit
main = do
  forE 1 10 \i -> do 
    i <- randomInt 1 5
    logShow i