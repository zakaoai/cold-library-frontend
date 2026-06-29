import useUserContext from "@/hooks/context/useUserContext"
import { useMemo } from "react"
import useMyRequest from "./useMyRequest"
import useRequest from "./useRequest"

const useRequestActivity = () => {
  const { isAdmin } = useUserContext()
  const { requests, updateRequest, deleteRequest } = useRequest()
  const { myRequests } = useMyRequest()

  const displayedRequests = useMemo(() => (isAdmin ? requests : myRequests), [isAdmin, myRequests, requests])

  return { requests: displayedRequests, updateRequest, deleteRequest }
}

export default useRequestActivity
