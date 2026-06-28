import { useCallback } from "react"

import useUserContext from "@/hooks/context/useUserContext"
import { useQueryClient } from "@tanstack/react-query"

/**
 * Hook for managing user-related operations and state.
 * Provides standardized access to user data and user-related mutations.
 */
export const useUserOperations = () => {
  const userContext = useUserContext()
  const queryClient = useQueryClient()

  const invalidateUserQueries = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["user"] })
    void queryClient.invalidateQueries({ queryKey: ["profile"] })
  }, [queryClient])

  const clearUserData = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["user"] })
    queryClient.removeQueries({ queryKey: ["profile"] })
  }, [queryClient])

  const invalidateContextOnUserUpdate = useCallback(() => {
    // Hook to coordinate user updates between context and React Query
    invalidateUserQueries()
  }, [invalidateUserQueries])

  return {
    invalidateUserQueries,
    clearUserData,
    invalidateContextOnUserUpdate,
    currentUser: userContext?.user
  }
}
