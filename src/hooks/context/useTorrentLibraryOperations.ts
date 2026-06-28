import { useCallback, useMemo } from "react"

import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { useQueryClient } from "@tanstack/react-query"

export interface TorrentLibraryState {
  totalCount: number
  isEmpty: boolean
  isLoading?: boolean
}

/**
 * Hook for managing torrent tracking operations with standardized state management.
 * Centralizes torrent-related queries, mutations, and cache invalidation.
 *
 * Provides:
 * - Standardized access to torrent library
 * - Torrent-scoped cache management
 * - State predicates (isEmpty, totalCount)
 */
export const useTorrentLibraryOperations = () => {
  const appContext = useAppContext()
  const queryClient = useQueryClient()

  const torrentState: TorrentLibraryState = useMemo(
    () => ({
      totalCount: appContext.torrentLibrary.length,
      isEmpty: appContext.torrentLibrary.length === 0
    }),
    [appContext.torrentLibrary.length]
  )

  const invalidateTorrentQueries = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["anime", "torrent"] })
  }, [queryClient])

  const clearTorrentCache = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["anime", "torrent"] })
  }, [queryClient])

  const updateTorrentInLibrary = useCallback(
    (torrent: AnimeTorrentDTO) => {
      appContext.setTorrentLibrary(prev => {
        const index = prev.findIndex(t => t.malId === torrent.malId)
        if (index >= 0) {
          return [...prev.slice(0, index), torrent, ...prev.slice(index + 1)]
        }
        return [...prev, torrent]
      })
    },
    [appContext]
  )

  const removeTorrentFromLibrary = useCallback(
    (torrentMalId: number) => {
      appContext.setTorrentLibrary(prev => prev.filter(t => t.malId !== torrentMalId))
    },
    [appContext]
  )

  return {
    torrentState,
    invalidateTorrentQueries,
    clearTorrentCache,
    updateTorrentInLibrary,
    removeTorrentFromLibrary,
    library: appContext.torrentLibrary
  }
}
