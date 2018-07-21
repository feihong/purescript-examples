module Main where

import Prelude

import Data.Char (fromCharCode)
import Data.Maybe (fromMaybe)
import Data.String.CodeUnits (singleton)
import Effect (Effect, forE)
import Effect.Console (log)
import Effect.Random (randomInt)

main :: Effect Unit
main = do
  forE 1 10 \_ -> do 
    i <- randomInt 0x4e00 0x9fff
    i # fromCharCode # fromMaybe '?' # singleton # log