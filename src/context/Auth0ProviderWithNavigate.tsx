import { APP_AUTH0_AUDIENCE, APP_AUTH0_CALLBACK_URL, APP_AUTH0_CLIENT_ID, APP_AUTH0_DOMAIN } from "@/constants/config"
import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

const Auth0ProviderWithNavigate = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(APP_AUTH0_DOMAIN && APP_AUTH0_CLIENT_ID && APP_AUTH0_CALLBACK_URL)) {
    return null
  }

  return (
    <Auth0Provider
      domain={APP_AUTH0_DOMAIN}
      clientId={APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: APP_AUTH0_CALLBACK_URL,
        audience: APP_AUTH0_AUDIENCE,
        scope: "profile email admin"
      }}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}
export default Auth0ProviderWithNavigate
