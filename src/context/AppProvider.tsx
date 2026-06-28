import type { PropsWithChildren } from "react"
import AppContext from "./AppContext"
import { useAppState } from "./useAppState"

const AppProvider = ({ children }: PropsWithChildren) => {
  const contextValue = useAppState()

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppProvider
