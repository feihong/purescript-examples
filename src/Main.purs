module Main where

import Prelude

import Effect (Effect)
import RandomHanzi as RandomHanzi
import HttpClient as HttpClient

main :: Effect Unit
-- main = HttpClient.main
main = RandomHanzi.main
