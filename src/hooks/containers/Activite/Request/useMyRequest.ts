import RequestStatus from "@/enums/RequestStatus"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import RequestService from "@/services/RequestService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback, useMemo } from "react"

const useMyRequest = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: myRequests = [] } = useQuery({
    queryKey: ["requests", "me"],
    queryFn: () => RequestService.getMe(),
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  })

  const createRequestCall = useCallback(
    async (requestInput: RequestInputDTO) => RequestService.create(requestInput),
    []
  )

  const onSuccessCreateRequest = useCallback(
    (createdRequest: RequestDTO) => {
      queryClient.setQueryData<RequestDTO[]>(["requests", "me"], old => {
        if (!old) return [createdRequest]
        return [createdRequest, ...old]
      })
      queryClient.setQueryData<RequestDTO[]>(["requests", "all"], old => {
        if (!old) return [createdRequest]
        return [createdRequest, ...old]
      })
    },
    [queryClient]
  )

  const onErrorCreateRequest = useCallback(
    (error: ResponseError, requestInput: RequestInputDTO) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la création de la request",
        variant: "error"
      })
      console.error("Erreur création request", requestInput.malId, error.response?.status)
    },
    [enqueueSnackbar]
  )

  const { mutate: createRequest } = useMutation({
    mutationFn: createRequestCall,
    onSuccess: onSuccessCreateRequest,
    onError: onErrorCreateRequest
  })

  const myOpenedRequestMap = useMemo(
    () =>
      myRequests.reduce<Record<number, RequestDTO>>((acc, curr) => {
        if (curr.state === RequestStatus.PENDING) acc[curr.malId] = curr
        return acc
      }, {}),
    [myRequests]
  )

  return {
    myRequests,
    createRequest,
    myOpenedRequestMap
  }
}

export default useMyRequest
