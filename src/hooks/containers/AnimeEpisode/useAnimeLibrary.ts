import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import AnimeServices from "@/services/AnimeService"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useAnimeLibrary = (malId: number) => {
  const [anime, setAnime] = useState<AnimeDTO | undefined>(undefined)

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["animeLibrary"],
    queryFn: async () => await AnimeServices.get(malId),
    retry: false
  })

  useEffect(() => {
    if (isFetched && data != undefined) {
      setAnime(data)
    }
  }, [data, isFetched])

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      if (anime !== undefined) setAnime({ ...anime, ...updatedAnime })
    },
    [anime]
  )

  const updateAnimeInfos = useCallback(() => {
    AnimeServices.update(malId).then(updateAnime)
  }, [malId, updateAnime])

  return {
    anime,
    isFetching,
    updateAnime,
    updateAnimeInfos
  }
}

export default useAnimeLibrary
