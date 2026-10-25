import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import AnimeServices from "@/services/AnimeService"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { useCallback } from "react"

const useLibrary = () => {
  const queryClient = useQueryClient()

  const { data: animes = [], isFetching } = useQuery({
    queryKey: ["animeLibrary"],
    queryFn: async () => await AnimeServices.getAll(),
    retry: false,
    select: useCallback((data: AnimeDTO[]) => [...data].reverse(), [])
  })

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      queryClient.setQueryData<AnimeDTO[]>(["animeLibrary"], animes => {
        if (!animes) {
          return "title" in updatedAnime ? [updatedAnime] : animes
        }

        const index = animes.findIndex(anime => anime.malId === updatedAnime.malId)
        if (index === -1) {
          return "title" in updatedAnime ? [...animes, updatedAnime] : animes
        }

        const updatedAnimes = [...animes]
        updatedAnimes[index] = { ...updatedAnimes[index], ...updatedAnime }
        return updatedAnimes
      })
    },
    [queryClient]
  )

  return { animes, isFetching, updateAnime }
}

export default useLibrary
