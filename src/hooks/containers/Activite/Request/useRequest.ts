import useAppContext from "@/hooks/context/useAppContext"
import useUserContext from "@/hooks/context/useUserContext"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import RequestService from "@/services/RequestService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback, useEffect, useMemo, useState } from "react"

const useRequest = () => {
  const { myRequests, setMyRequests } = useAppContext()
  const [requests, setRequests] = useState<RequestDTO[]>([])
  const { enqueueSnackbar } = useSnackbar()
  const { isAdmin } = useUserContext()

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
    enqueueSnackbar({
      message: "Une erreur est survenue lors de la mise à jour d'une request",
      variant: "error"
    })
    console.error(
      "Une erreur est survenue lors de la mise à jour d'une request pour l'anime %s avec le status %s",
      requestInput.malId,
      error.response?.status
    )
  }, [])

  const { mutate: updateRequest } = useMutation({
    mutationFn: updateRequestCall,
    onSuccess: onSuccessUpdateRequest,
    onError: onErrorCreateRequest
  })

  const deleteRequestCall = useCallback(async (id: number) => {
    await RequestService.delete(id)
  }, [])

  const onSuccessDeleteRequest = useCallback(
    (__: void, id: number) => {
      setRequests(requests => requests.filter(request => request.id !== id))
      setMyRequests(requests => requests.filter(request => request.id !== id))
    },
    [setRequests, setMyRequests]
  )

  const onErrorDeleteRequest = useCallback((error: ResponseError, id: number) => {
    const errorMessage =
      error.response?.status === 412
        ? "Vous n'avez pas la permission de supprimer cette request"
        : "Une erreur est survenue lors de la suppression d'une request"

    enqueueSnackbar({
      message: errorMessage,
      variant: "error"
    })
    console.error(
      "Une erreur est survenue lors de la suppression de la request avec l'id %s et le status %s",
      id,
      error.response?.status
    )
  }, [])

  const { mutate: deleteRequest } = useMutation({
    mutationFn: deleteRequestCall,
    onSuccess: onSuccessDeleteRequest,
    onError: onErrorDeleteRequest
  })

  const displayedRequests = useMemo(() => (isAdmin ? requests : myRequests), [isAdmin, myRequests, requests])

  return { requests: displayedRequests, isAllRequestFetching, updateRequest, deleteRequest }
}

export default useRequest
