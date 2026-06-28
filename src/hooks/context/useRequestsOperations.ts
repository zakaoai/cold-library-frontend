import { useCallback, useMemo } from "react"

import useAppContext from "@/hooks/context/useAppContext"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import { useQueryClient } from "@tanstack/react-query"

export interface RequestsState {
  totalCount: number
  isEmpty: boolean
  isLoading?: boolean
}

/**
 * Hook for managing user requests (feature requests, additions, etc.) with standardized operations.
 * Centralizes request-related mutations and cache management.
 *
 * Provides:
 * - Standardized access to user requests
 * - Request-scoped cache invalidation
 * - CRUD operations on requests with consistent state updates
 */
export const useRequestsOperations = () => {
  const appContext = useAppContext()
  const queryClient = useQueryClient()

  const requestsState: RequestsState = useMemo(
    () => ({
      totalCount: appContext.myRequests.length,
      isEmpty: appContext.myRequests.length === 0
    }),
    [appContext.myRequests.length]
  )

  const invalidateRequestsQueries = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["requests"] })
  }, [queryClient])

  const clearRequestsCache = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["requests"] })
  }, [queryClient])

  const addRequestToList = useCallback(
    (request: RequestDTO) => {
      appContext.setMyRequests(prev => [...prev, request])
    },
    [appContext]
  )

  const updateRequest = useCallback(
    (request: RequestDTO) => {
      appContext.setMyRequests(prev => {
        const index = prev.findIndex(r => r.id === request.id)
        if (index >= 0) {
          return [...prev.slice(0, index), request, ...prev.slice(index + 1)]
        }
        return prev
      })
    },
    [appContext]
  )

  const removeRequest = useCallback(
    (requestId: number) => {
      appContext.setMyRequests(prev => prev.filter(r => r.id !== requestId))
    },
    [appContext]
  )

  return {
    requestsState,
    invalidateRequestsQueries,
    clearRequestsCache,
    addRequestToList,
    updateRequest,
    removeRequest,
    requests: appContext.myRequests
  }
}
