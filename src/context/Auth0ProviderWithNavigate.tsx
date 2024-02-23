import { APP_AUTH0_AUDIENCE, APP_AUTH0_CLIENT_ID, APP_AUTH0_DOMAIN } from "@/constants/config"
import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

const Auth0ProviderWithNavigate = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(APP_AUTH0_DOMAIN && APP_AUTH0_CLIENT_ID)) {
    return null
  }

  return (
    <Auth0Provider
      cacheLocation="localstorage"
      useRefreshTokens={true}
      domain={APP_AUTH0_DOMAIN}
      clientId={APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + "/app/home",
        audience: APP_AUTH0_AUDIENCE,
        scope: "profile email admin"
      }}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}
export default Auth0ProviderWithNavigate
