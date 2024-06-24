import { useMutation } from "@tanstack/react-query"

import { AnimeType } from "@/enums/AnimeType"
import type Season from "@/enums/Season"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import type ResponseError from "@/interfaces/services/ResponseError"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import SeasonService from "@/services/SeasonService"
import { useCallback, useEffect, useMemo } from "react"
import useLibrary from "../../AnimeLibrary/useLibrary"

const useSeason = () => {
  const { animes: animeLibrary } = useLibrary()
  const {
    myAnimeList,
    setMyAnimeList,
    // setUpdateAnimeStateFunction
    pagination: { handleChangePage }
  } = useMyAnimeListContext()
  const { seasonSelected, yearSelected, sortBySelected, typeSelected } = useSeasonContext()

  const getSeasonCall = useCallback(
    async ({ year, season }: { year: number; season: Season }) => await SeasonService.getSeason(year, season),
    []
  )

  const onErrorGetSeason = useCallback((error: ResponseError, { year, season }: { year: number; season: Season }) => {
    console.error(
      "Une erreur est survenue lors de la récupération de la saison %s - %s le status %s",
      season,
      year,
      error?.response?.status
    )
  }, [])

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
        ...(animeLibrary.find(({ malId }) => malAnime.id === malId) ?? {})
      }

      return returnedAnime
    },
    [animeLibrary]
  )

  const onSucessGetSeason = useCallback(
    (animes: MALAnime[]) => {
      setMyAnimeList(animes.map(mappedMALAnime))
      handleChangePage(null, 0)
    },
    [handleChangePage, mappedMALAnime, setMyAnimeList]
  )

  const { isPending: isGetSeasonPending, mutate: getSeason } = useMutation<
    MALAnime[],
    ResponseError,
    { year: number; season: Season }
  >({
    mutationFn: getSeasonCall,
    onSuccess: onSucessGetSeason,
    onError: onErrorGetSeason
  })

  useEffect(() => {
    getSeason({
      year: yearSelected,
      season: seasonSelected
    })
  }, [getSeason, seasonSelected, yearSelected])

  const resultSeasonAnimeList = useMemo(
    () =>
      myAnimeList
        .filter(a => (typeSelected === AnimeType.ALL ? true : a.type?.toUpperCase() === typeSelected.toUpperCase()))
        .toSorted(
          (a, b) =>
            ({
              num_list_users: (b.num_list_users ?? 0) - (a.num_list_users ?? 0),
              title: a.title.localeCompare(b.title),
              genres: 0,
              id: 0,
              main_picture: 0,
              start_date: 0,
              end_date: 0,
              mean: 0,
              rank: 0,
              popularity: 0,
              media_type: 0,
              status: 0,
              num_episodes: 0,
              start_season: 0,
              broadcast: 0,
              rating: 0,
              userStatus: 0
            })[sortBySelected]
        ),
    [myAnimeList, sortBySelected, typeSelected]
  )

  return { seasonAnime: resultSeasonAnimeList, isGetSeasonPending }
}

export default useSeason
