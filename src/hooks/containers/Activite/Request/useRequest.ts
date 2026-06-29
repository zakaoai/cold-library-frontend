import useUserContext from "@/hooks/context/useUserContext"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import RequestService from "@/services/RequestService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback } from "react"

const useRequest = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { isAdmin } = useUserContext()
  const queryClient = useQueryClient()

  const { data: requests = [], isFetching: isAllRequestFetching } = useQuery({
    queryKey: ["requests", "all"],
    queryFn: () => RequestService.getAll(),
    enabled: isAdmin,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false
  })

  const updateRequestInCache = useCallback(
    (updatedRequest: RequestDTO) => {
      queryClient.setQueriesData<RequestDTO[]>({ queryKey: ["requests"] }, old => {
        if (!old) return old
        return old.map(request => (request.id === updatedRequest.id ? updatedRequest : request))
      })
    },
    [queryClient]
  )

  const updateRequestCall = useCallback(async (requestInput: RequestDTO) => RequestService.update(requestInput), [])

  const onErrorUpdateRequest = useCallback(
    (error: ResponseError, requestInput: RequestDTO) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la mise à jour d'une request",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la mise à jour d'une request pour l'anime %s avec le status %s",
        requestInput.malId,
        error.response?.status
      )
    },
    [enqueueSnackbar]
  )

  const { mutate: updateRequest } = useMutation({
    mutationFn: updateRequestCall,
    onSuccess: updateRequestInCache,
    onError: onErrorUpdateRequest
  })

  const deleteRequestCall = useCallback(async (id: number) => {
    await RequestService.delete(id)
  }, [])

  const onSuccessDeleteRequest = useCallback(
    (_, id: number) => {
      queryClient.setQueriesData<RequestDTO[]>({ queryKey: ["requests"] }, old => {
        if (!old) return old
        return old.filter(request => request.id !== id)
      })
    },
    [queryClient]
  )

  const onErrorDeleteRequest = useCallback(
    (error: ResponseError, id: number) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la suppression d'une request",
        variant: "error"
      })
      console.error("Erreur suppression request", id, error.response?.status)
    },
    [enqueueSnackbar]
  )

  const { mutate: deleteRequest } = useMutation({
    mutationFn: deleteRequestCall,
    onSuccess: onSuccessDeleteRequest,
    onError: onErrorDeleteRequest
  })

  return {
    requests,
    isAllRequestFetching,
    updateRequest,
    deleteRequest
  }
}

export default useRequest
