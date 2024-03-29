import useAppContext from "@/hooks/context/useAppContext"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import { useQuery } from "@tanstack/react-query"

import { AnimeType } from "@/enums/AnimeType"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import UserService from "@/services/UserService"
import { useCallback, useEffect, useState } from "react"
import useLibrary from "../../AnimeLibrary/useLibrary"

const useMyAnimeList = () => {
  const { setAnimeLibrary } = useAppContext()
  const { animes: animeLibrary } = useLibrary()

  const [myAnimeList, setMyAnimeList] = useState<(Omit<MALAnime, "broadcast"> & AnimeDTO)[]>([])

  const { data, isFetched, isFetching } = useQuery({
    staleTime: 3600000,
    queryKey: ["myAnimeList"],
    queryFn: async () => await UserService.animelist(),
    retry: false,
    enabled: myAnimeList === undefined || myAnimeList.length === 0
  })

  const mappedMALAnime = useCallback(
    (malAnime: MALAnime) => {
      const returnedAnime = {
        ...malAnime,
        malId: malAnime.id,
        malUrl: "",
        malImg: malAnime.main_picture.large,
        type: malAnime.media_type as AnimeType,
        episodes: malAnime.num_episodes,
        score: malAnime.mean,
        season: malAnime?.start_season?.season,
        year: malAnime?.start_season?.year,
        broadcast: malAnime?.broadcast?.day_of_the_weak + " " + malAnime?.broadcast?.start_time,
        ...(animeLibrary.find(({ malId }) => malAnime.id === malId) || {})
      }

      return returnedAnime
    },
    [animeLibrary]
  )

  useEffect(() => {
    if (data != undefined) setMyAnimeList(data.map(mappedMALAnime))
  }, [data, isFetched, mappedMALAnime])

  const updateAnime = (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
    setAnimeLibrary(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  return { myAnimeList, isFetching, updateAnime }
}

export default useMyAnimeList
