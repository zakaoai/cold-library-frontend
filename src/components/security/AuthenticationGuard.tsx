import PageLoader from "@/containers/Loader/PageLoader"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import React, { ComponentType } from "react"

interface AuthenticationGuardProps {
  component: ComponentType
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    )
  })

  return <Component />
}
