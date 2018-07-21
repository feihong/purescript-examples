module HttpClient where

import Prelude

import Data.Either (Either(..))
import Data.HTTP.Method (Method(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Network.HTTP.Affjax as AX
import Network.HTTP.Affjax.Response as AXRes

main :: Effect (Unit)
main = launchAff_ $ do
  let req = AX.defaultRequest { url = "http://ipecho.net/plain", 
                                method = Left GET }
  res <- AX.affjax AXRes.string req
  liftEffect $ log $ "Your IP address: " <> res.response
