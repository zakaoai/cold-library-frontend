import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import Auth0Avatar from "./Auth0Avatar"
import Auth0LoginButton from "./Auth0LoginButton"

const Auth0AccountMenu = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated) getAccessTokenSilently().then(token => sessionStorage.setItem("token", token))
  }, [getAccessTokenSilently, isAuthenticated, isLoading])

  return isAuthenticated ? <Auth0Avatar /> : <Auth0LoginButton />
}

export default Auth0AccountMenu
