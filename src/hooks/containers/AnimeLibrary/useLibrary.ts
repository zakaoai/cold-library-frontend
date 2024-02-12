import useAppContext from "@/hooks/context/useAppContext"
import AnimeServices from "@/services/AnimeService"
import { useQuery } from "@tanstack/react-query"

import { useEffect } from "react"

const useLibrary = () => {
  const { animeLibrary, setAnimeLibrary } = useAppContext()

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["animeLibrary"],
    queryFn: async () => await AnimeServices.getAll(),
    retry: false
  })

  useEffect(() => {
    if (isFetched && data != undefined && data != animeLibrary) {
      setAnimeLibrary(data)
    }
  }, [animeLibrary, data, isFetched, setAnimeLibrary])

  const updateAnime = (updatedAnime: { malId: number }) => {
    setAnimeLibrary(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  return { animes: animeLibrary, isFetching, updateAnime }
}

export default useLibrary
