import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AppContext from "./AppContext"

const AppProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO | undefined>(undefined)

  const contextValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppProvider
