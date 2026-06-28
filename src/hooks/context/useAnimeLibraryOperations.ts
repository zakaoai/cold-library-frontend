import { useCallback, useMemo } from "react"

import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { useQueryClient } from "@tanstack/react-query"

export interface AnimeLibraryState {
  totalCount: number
  isEmpty: boolean
  isLoading?: boolean
}

/**
 * Hook for managing anime library operations with standardized state management.
 * Centralizes library-related queries and mutations.
 *
 * Provides:
 * - Standardized access to library data
 * - Library-scoped invalidation and cache management
 * - Loading and empty states
 */
export const useAnimeLibraryOperations = () => {
  const appContext = useAppContext()
  const queryClient = useQueryClient()

  const libraryState: AnimeLibraryState = useMemo(
    () => ({
      totalCount: appContext.animeLibrary.length,
      isEmpty: appContext.animeLibrary.length === 0
    }),
    [appContext.animeLibrary.length]
  )

  const invalidateLibraryQueries = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["anime", "library"] })
  }, [queryClient])

  const clearLibraryCache = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["anime", "library"] })
  }, [queryClient])

  const updateAnimeInLibrary = useCallback(
    (anime: AnimeDTO) => {
      appContext.setAnimeLibrary(prev => {
        const index = prev.findIndex(a => a.malId === anime.malId)
        if (index >= 0) {
          return [...prev.slice(0, index), anime, ...prev.slice(index + 1)]
        }
        return [...prev, anime]
      })
    },
    [appContext]
  )

  const removeAnimeFromLibrary = useCallback(
    (animeMalId: number) => {
      appContext.setAnimeLibrary(prev => prev.filter(a => a.malId !== animeMalId))
    },
    [appContext]
  )

  return {
    libraryState,
    invalidateLibraryQueries,
    clearLibraryCache,
    updateAnimeInLibrary,
    removeAnimeFromLibrary,
    library: appContext.animeLibrary
  }
}
