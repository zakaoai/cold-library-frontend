import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi, beforeEach } from "vitest"

import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { renderHook, act } from "@testing-library/react"
import { useAnimeLibraryOperations } from "@/hooks/context/useAnimeLibraryOperations"
import AppProvider from "@/context/AppProvider"

/**
 * Integration tests for anime library critical user flows.
 * Tests the interaction between components, hooks, and state management.
 */

const mockAnime: AnimeDTO = {
  malId: 1,
  malUrl: "https://myanimelist.net/anime/1",
  title: "Cowboy Bebop",
  episodes: 26,
  status: "Finished Airing"
}

describe("Anime Library Integration Tests", () => {
  describe("Add anime to library", () => {
    it("should add anime to library and update state", () => {
      function Wrapper({ children }: { children: React.ReactNode }) {
        return <AppProvider>{children}</AppProvider>
      }

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper: Wrapper })

      expect(result.current.library).toHaveLength(0)

      act(() => {
        result.current.updateAnimeInLibrary(mockAnime)
      })

      expect(result.current.library).toHaveLength(1)
      expect(result.current.library[0]).toEqual(mockAnime)
      expect(result.current.libraryState.isEmpty).toBe(false)
      expect(result.current.libraryState.totalCount).toBe(1)
    })

    it("should update existing anime instead of duplicating", () => {
      function Wrapper({ children }: { children: React.ReactNode }) {
        return <AppProvider>{children}</AppProvider>
      }

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper: Wrapper })

      act(() => {
        result.current.updateAnimeInLibrary(mockAnime)
      })

      const updatedAnime: AnimeDTO = { ...mockAnime, episodes: 50, status: "Updated" }

      act(() => {
        result.current.updateAnimeInLibrary(updatedAnime)
      })

      expect(result.current.library).toHaveLength(1)
      expect(result.current.library[0]?.episodes).toBe(50)
      expect(result.current.library[0]?.status).toBe("Updated")
    })
  })

  describe("Remove anime from library", () => {
    it("should remove anime by malId", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper })

      act(() => {
        result.current.updateAnimeInLibrary(mockAnime)
      })

      expect(result.current.library).toHaveLength(1)

      act(() => {
        result.current.removeAnimeFromLibrary(mockAnime.malId)
      })

      expect(result.current.library).toHaveLength(0)
      expect(result.current.libraryState.isEmpty).toBe(true)
    })
  })

  describe("Library state predicates", () => {
    it("should correctly track isEmpty state", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper })

      expect(result.current.libraryState.isEmpty).toBe(true)

      act(() => {
        result.current.updateAnimeInLibrary(mockAnime)
      })

      expect(result.current.libraryState.isEmpty).toBe(false)
    })

    it("should correctly track totalCount", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper })

      const animes = [
        { ...mockAnime, malId: 1 },
        { ...mockAnime, malId: 2, title: "Anime 2" },
        { ...mockAnime, malId: 3, title: "Anime 3" }
      ]

      act(() => {
        animes.forEach(anime => result.current.updateAnimeInLibrary(anime))
      })

      expect(result.current.libraryState.totalCount).toBe(3)
    })
  })

  describe("Multiple operations sequence", () => {
    it("should handle complex user flow: add, update, remove", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>

      const { result } = renderHook(() => useAnimeLibraryOperations(), { wrapper })

      // Step 1: Add anime
      act(() => {
        result.current.updateAnimeInLibrary(mockAnime)
      })

      expect(result.current.libraryState.totalCount).toBe(1)

      // Step 2: Add another anime
      const anime2: AnimeDTO = { ...mockAnime, malId: 2, title: "Second Anime" }

      act(() => {
        result.current.updateAnimeInLibrary(anime2)
      })

      expect(result.current.libraryState.totalCount).toBe(2)

      // Step 3: Update first anime
      const updatedAnime: AnimeDTO = { ...mockAnime, episodes: 50 }

      act(() => {
        result.current.updateAnimeInLibrary(updatedAnime)
      })

      expect(result.current.libraryState.totalCount).toBe(2)
      expect(result.current.library[0]?.episodes).toBe(50)

      // Step 4: Remove first anime
      act(() => {
        result.current.removeAnimeFromLibrary(mockAnime.malId)
      })

      expect(result.current.libraryState.totalCount).toBe(1)
      expect(result.current.library[0]?.malId).toBe(2)
    })
  })
})
