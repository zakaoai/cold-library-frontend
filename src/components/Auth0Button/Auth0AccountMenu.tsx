import { useAuth0 } from "@auth0/auth0-react"
import Auth0Avatar from "./Auth0Avatar"
import Auth0LoginButton from "./Auth0LoginButton"

const Auth0AccountMenu = () => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? <Auth0Avatar /> : <Auth0LoginButton />
}

export default Auth0AccountMenu
