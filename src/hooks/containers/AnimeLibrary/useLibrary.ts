import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import AnimeServices from "@/services/AnimeService"
import { useQuery } from "@tanstack/react-query"

import { useCallback, useEffect, useRef } from "react"

const useLibrary = () => {
  const { animeLibrary, setAnimeLibrary } = useAppContext()

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["animeLibrary"],
    queryFn: async () => await AnimeServices.getAll(),
    retry: false,
    enabled: animeLibrary === undefined || animeLibrary.length === 0
  })

  const prevData = useRef<AnimeDTO[]>(null)

  useEffect(() => {
    if (isFetched && data !== undefined && data !== prevData.current) {
      data.reverse()
      prevData.current = data
      setAnimeLibrary(data)
    }
  }, [animeLibrary, data, isFetched, setAnimeLibrary])

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      setAnimeLibrary(animes =>
        animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
      )
    },
    [setAnimeLibrary]
  )

  return { animes: animeLibrary, isFetching, updateAnime }
}

export default useLibrary
