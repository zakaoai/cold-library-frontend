import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import AppProvider from "../AppProvider"

describe("AppProvider", () => {
  it("exposes initial state and updates the anime library", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AppProvider>{children}</AppProvider>

    const { result } = renderHook(() => useAppContext(), { wrapper })

    expect(result.current.animeLibrary).toEqual([])

    const anime = {
      malId: 1,
      malUrl: "https://test.com",
      title: "Test Anime"
    } as AnimeDTO

    act(() => {
      result.current.setAnimeLibrary([anime])
    })

    expect(result.current.animeLibrary).toEqual([anime])
  })
})
