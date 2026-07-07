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
    select: useCallback((data: AnimeDTO[]) => data.reverse(), [])
  })

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      queryClient.setQueryData<AnimeDTO[]>(["animeLibrary"], animes =>
        animes?.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
      )
    },
    [queryClient]
  )

  return { animes, isFetching, updateAnime }
}

export default useLibrary
