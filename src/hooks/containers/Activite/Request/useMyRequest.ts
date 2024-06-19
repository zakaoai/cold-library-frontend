import RequestStatus from "@/enums/RequestStatus"
import useAppContext from "@/hooks/context/useAppContext"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import RequestService from "@/services/RequestService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef } from "react"

const useMyRequest = () => {
  const { myRequests, setMyRequests } = useAppContext()

  const { data, isFetched } = useQuery({
    staleTime: 3600000,
    queryKey: ["MyRequest"],
    queryFn: async () => await RequestService.getMe(),
    retry: false,
    enabled: myRequests.length === 0
  })

  const prevData = useRef<RequestDTO[]>()

  const updateMyRequests = (updatedRequest: RequestDTO) => {
    setMyRequests(requests =>
      requests.map(request => (request.id === updatedRequest.id ? { ...request, ...updatedRequest } : request))
    )
  }

  const createMyRequest = useCallback(
    (createdRequest: RequestDTO) => {
      setMyRequests(requests => [...requests, createdRequest])
    },
    [setMyRequests]
  )

  const createRequestCall = useCallback(
    async (requestInput: RequestInputDTO) => await RequestService.create(requestInput),
    []
  )

  const onSuccessCreateRequest = useCallback(
    (request: RequestDTO) => {
      createMyRequest(request)
    },
    [createMyRequest]
  )

  const onErrorCreateRequest = useCallback((error: ResponseError, requestInput: RequestInputDTO) => {
    console.error(
      "Une erreur est survenue lors de la création d'une request pour l'anime %s avec le status %s",
      requestInput.malId,
      error?.response?.status
    )
  }, [])

  const { mutate: createRequest } = useMutation({
    mutationFn: createRequestCall,
    onSuccess: onSuccessCreateRequest,
    onError: onErrorCreateRequest
  })

  useEffect(() => {
    if (isFetched && data !== undefined && data !== prevData.current) {
      prevData.current = data
      setMyRequests(data)
    }
  }, [data, isFetched, setMyRequests])

  const myOpenedRequestMap = useMemo(
    () =>
      myRequests.reduce<Record<number, RequestDTO>>((acc, curr) => {
        if (curr.state === RequestStatus.PENDING) acc[curr.malId] = curr
        return acc
      }, {}),
    [myRequests]
  )

  return { myRequests, myOpenedRequestMap, updateMyRequests, createRequest }
}

export default useMyRequest
