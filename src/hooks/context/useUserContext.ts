import UserContext from "@/context/UserContext"
import { useContext } from "react"

const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider")
  }
  return context
}

export default useUserContext
