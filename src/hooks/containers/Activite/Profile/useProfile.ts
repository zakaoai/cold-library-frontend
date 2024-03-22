import useAppContext from "@/hooks/context/useAppContext"
import UserService from "@/services/UserService"
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"

const useProfil = () => {
  const getCurrentUserCall = useCallback(() => UserService.getCurrent(), [])
  const { isAuthenticated } = useAuth0()
  const { user, setUser } = useAppContext()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserCall,
    retry: false,
    enabled: user === undefined && isAuthenticated
  })

  useEffect(() => {
    setUser(data)
  }, [data])

  return { user }
}

export default useProfil
