import { useAuth0 } from "@auth0/auth0-react"
import { useMemo, type PropsWithChildren } from "react"
import UserContext from "./UserContext"

const UserProvider = ({ children }: PropsWithChildren) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

  getAccessTokenSilently()
  const isAdmin = useMemo(() => (user?.["zakaoai.eu.auth0.com/roles"] as string[])?.includes("Admin"), [user])

  const contextValue = useMemo(
    () => ({
      user,
      isAdmin,
      isAuthenticated,
      isLoading
    }),
    [isAdmin, isAuthenticated, isLoading, user]
  )

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserProvider
