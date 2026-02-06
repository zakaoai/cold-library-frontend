import useUserContext from "@/hooks/context/useUserContext"
import { ComponentType, PropsWithChildren } from "react"
import { levelOrder } from "./withAuthorization.const"
import { AuthorizationLevel, WithAuthorizationOptions } from "./withAuthorization.types"

function withAuthorization<P>(WrappedComponent: ComponentType<P>, options: WithAuthorizationOptions) {
  const { minLevel } = options

  const WithAuthorization = (props: PropsWithChildren<P>) => {
    const { isAuthenticated, isAdmin, isLoading } = useUserContext()

    if (isLoading) {
      return null
    }

    let userLevel: AuthorizationLevel = "anonymous"
    if (isAuthenticated) {
      userLevel = isAdmin ? "admin" : "user"
    }

    const canAccess = levelOrder.indexOf(userLevel) >= levelOrder.indexOf(minLevel)

    if (!canAccess) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  WithAuthorization.displayName = `WithAuthorization(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`

  return WithAuthorization
}

export default withAuthorization
