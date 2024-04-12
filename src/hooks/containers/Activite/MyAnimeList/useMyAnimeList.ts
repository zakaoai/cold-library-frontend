import useAppContext from "@/hooks/context/useAppContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import { useQuery } from "@tanstack/react-query"

import { type AnimeType } from "@/enums/AnimeType"
import UserAnimeStatus from "@/enums/UserAnimeStatus"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import UserService from "@/services/UserService"
import { useCallback, useEffect } from "react"
import useLibrary from "../../AnimeLibrary/useLibrary"

const useMyAnimeList = () => {
  const { setAnimeLibrary } = useAppContext()
  const { animes: animeLibrary } = useLibrary()

  const { myAnimeList, setMyAnimeList } = useMyAnimeListContext()

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
        broadcast: malAnime?.broadcast?.day_of_the_week + " " + malAnime?.broadcast?.start_time,
        ...(animeLibrary.find(({ malId }) => malAnime.id === malId) || {})
      }

      return returnedAnime
    },
    [animeLibrary]
  )

  const sortMALAnimeList = (a: MALAnime, b: MALAnime) => {
    // Define the order of userStatus values
    const order: { [key in UserAnimeStatus]: number } = {
      [UserAnimeStatus.WATCHING]: 0,
      [UserAnimeStatus.COMPLETED]: 1,
      [UserAnimeStatus.ON_HOLD]: 2,
      [UserAnimeStatus.DROPPED]: 3,
      [UserAnimeStatus.PLAN_TO_WATCH]: 4
    }

    const sort = order[a.userStatus] - order[b.userStatus]

    if (sort !== 0) {
      return sort
    }

    // Then sort by title
    return a.title.localeCompare(b.title)
  }

  useEffect(() => {
    if (data !== undefined) setMyAnimeList(data.sort(sortMALAnimeList).map(mappedMALAnime))
  }, [data, isFetched, mappedMALAnime])

  const updateAnime = (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
    setAnimeLibrary(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  return { myAnimeList, isFetching, updateAnime }
}

export default useMyAnimeList
