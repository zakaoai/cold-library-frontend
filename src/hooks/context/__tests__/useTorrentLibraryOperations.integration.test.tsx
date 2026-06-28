import React from "react"
import { renderHook, act } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { useTorrentLibraryOperations } from "@/hooks/context/useTorrentLibraryOperations"
import AppProvider from "@/context/AppProvider"

/**
 * Integration tests for torrent library operations.
 */

const mockTorrent: AnimeTorrentDTO = {
  malId: 1,
  lastEpisodeOnServer: 12,
  searchWords: "Cowboy Bebop",
  dayOfRelease: "Monday",
  deltaEpisode: 0,
  torrentPath: "/path/to/torrent",
  title: "Cowboy Bebop",
  isComplete: false
}

describe("Torrent Library Integration Tests", () => {
  it("should track multiple torrents in library", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useTorrentLibraryOperations(), { wrapper: Wrapper })

    expect(result.current.torrentState.isEmpty).toBe(true)

    const torrents = [
      { ...mockTorrent, malId: 1 },
      { ...mockTorrent, malId: 2, title: "Torrent 2" },
      { ...mockTorrent, malId: 3, title: "Torrent 3" }
    ]

    act(() => {
      torrents.forEach(torrent => result.current.updateTorrentInLibrary(torrent))
    })

    expect(result.current.torrentState.totalCount).toBe(3)
    expect(result.current.torrentState.isEmpty).toBe(false)

    act(() => {
      result.current.removeTorrentFromLibrary(mockTorrent.malId)
    })

    expect(result.current.torrentState.totalCount).toBe(2)
  })

  it("should mark torrent as complete", () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <AppProvider>{children}</AppProvider>
    }

    const { result } = renderHook(() => useTorrentLibraryOperations(), { wrapper: Wrapper })

    act(() => {
      result.current.updateTorrentInLibrary(mockTorrent)
    })

    expect(result.current.library[0]?.isComplete).toBe(false)

    act(() => {
      result.current.updateTorrentInLibrary({ ...mockTorrent, isComplete: true })
    })

    expect(result.current.library[0]?.isComplete).toBe(true)
  })
})
