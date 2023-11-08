import { type AnimeEpisodeDTO } from "@/interfaces/services/AnimeEpisodeService/AnimeEpisodeDTO"
import AnimeEpisodeService from "@/services/AnimeEpisodeService"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function useAnimeEpisode(malId: number) {
  const [animeEpisodes, setAnimeEpisodes] = useState<AnimeEpisodeDTO[]>([])

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["api.animeEpisode.getAll", malId],
    queryFn: async () => await AnimeEpisodeService.getAll(malId)
  })

  useEffect(() => {
    if (isFetched && data !== undefined) {
      setAnimeEpisodes(data)
    }
  }, [isFetched])

  return { animeEpisodes, isFetching }
}
