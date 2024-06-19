import useAppContext from "@/hooks/context/useAppContext"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import RequestService from "@/services/RequestService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useRequest = () => {
  const { setMyRequests } = useAppContext()
  const [requests, setRequests] = useState<RequestDTO[]>([])

  const { data, isFetching: isAllRequestFetching } = useQuery({
    staleTime: 3600000,
    queryKey: ["AllRequest"],
    queryFn: async () => await RequestService.getAll(),
    retry: false
  })

  useEffect(() => {
    if (data !== undefined) {
      setRequests(data)
    }
  }, [data])

  const updateRequestCall = useCallback(
    async (requestInput: RequestDTO) => await RequestService.update(requestInput),
    []
  )

  const onSuccessUpdateRequest = useCallback(
    (request: RequestDTO) => {
      setRequests(requests => [...requests.map(prev => (prev.id === request.id ? request : prev))])
      setMyRequests(requests => [...requests.map(prev => (prev.id === request.id ? request : prev))])
    },
    [setRequests, setMyRequests]
  )

  const onErrorCreateRequest = useCallback((error: ResponseError, requestInput: RequestDTO) => {
    console.error(
      "Une erreur est survenue lors de la mise à jour d'une request pour l'anime %s avec le status %s",
      requestInput.malId,
      error?.response?.status
    )
  }, [])

  const { mutate: updateRequest } = useMutation({
    mutationFn: updateRequestCall,
    onSuccess: onSuccessUpdateRequest,
    onError: onErrorCreateRequest
  })

  return { requests, isAllRequestFetching, updateRequest }
}

export default useRequest
