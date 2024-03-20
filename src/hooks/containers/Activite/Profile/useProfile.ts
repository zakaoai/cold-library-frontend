import UserService from "@/services/UserService"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

const useProfil = () => {
  const getCurrentUserCall = useCallback(() => UserService.getCurrent(), [])

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserCall,
    retry: false
  })

  return { user }
}

export default useProfil
