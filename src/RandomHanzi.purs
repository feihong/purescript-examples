{-
Print some random hanzi.
-}
module RandomHanzi where

import Prelude

import Data.Char (fromCharCode)
import Data.Maybe (fromMaybe)
import Data.String.CodeUnits (singleton)
import Effect (Effect, forE)
import Effect.Console (log)
import Effect.Random (randomInt)

randomHanzi :: Effect String
randomHanzi = do 
  n <- randomInt 0x4e00 0x9fff
  n 
    # fromCharCode 
    # fromMaybe '?'
    # singleton
    # pure

main :: Effect Unit
main = do
  forE 1 10 \_ -> do 
    h <- randomHanzi
    log h 
