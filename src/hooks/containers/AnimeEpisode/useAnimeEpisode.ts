import { type AnimeEpisodeDTO } from "@/interfaces/services/AnimeEpisodeService/AnimeEpisodeDTO"
import AnimeEpisodeService from "@/services/AnimeEpisodeService"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useAnimeEpisode = (malId: number) => {
  const [animeEpisodes, setAnimeEpisodes] = useState<AnimeEpisodeDTO[]>([])

  const getAllEpisodesCall = useCallback(() => AnimeEpisodeService.getAll(malId), [malId])

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["api.animeEpisode.getAll", malId],
    queryFn: getAllEpisodesCall,
    retry: false
  })

  useEffect(() => {
    if (isFetched && data !== undefined) {
      setAnimeEpisodes(data)
    }
  }, [data, isFetched])

  return { animeEpisodes, isFetching }
}

export default useAnimeEpisode
