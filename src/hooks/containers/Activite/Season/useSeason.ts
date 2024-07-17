import { useMutation } from "@tanstack/react-query"

import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import { AnimeType } from "@/enums/AnimeType"
import type Season from "@/enums/Season"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import type MALAnimeAnimeDTO from "@/interfaces/containers/Activite/MyAnimeList/MALAnimeAnimeDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import type MALGenre from "@/interfaces/services/UserService/MyAnimeList/MALGenre"
import SeasonService from "@/services/SeasonService"
import { useCallback, useEffect, useMemo } from "react"
import useMyAnimeListMapper from "../MyAnimeList/useMyAnimeListMapper"

const useSeason = () => {
  const {
    selectedGenres,
    pagination: { handleChangePage }
  } = useDisplayAnimeContext()
  const { seasonSelected, yearSelected, sortBySelected, typeSelected, animeList, setAnimeList } = useSeasonContext()

  const getSeasonCall = useCallback(
    async ({ year, season }: { year: number; season: Season }) => await SeasonService.getSeason(year, season),
    []
  )

  const onErrorGetSeason = useCallback((error: ResponseError, { year, season }: { year: number; season: Season }) => {
    console.error(
      "Une erreur est survenue lors de la récupération de la saison %s - %s le status %s",
      season,
      year,
      error.response?.status
    )
  }, [])

  const { mappedMALAnime } = useMyAnimeListMapper()

  const onSucessGetSeason = useCallback(
    (animes: MALAnime[]) => {
      setAnimeList(animes.map(mappedMALAnime))
      handleChangePage(null, 0)
    },
    [handleChangePage, mappedMALAnime, setAnimeList]
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

  const filterByType = useCallback(
    (malAnimeDTO: MALAnimeAnimeDTO) =>
      typeSelected === AnimeType.ALL ? true : malAnimeDTO.type?.toUpperCase() === typeSelected.toUpperCase(),
    [typeSelected]
  )

  const filterByGenre = useCallback(
    ({ genres }: MALAnimeAnimeDTO) =>
      selectedGenres.length === 0 ||
      genres?.some(genre => selectedGenres.some(selectedGenre => genre.name === selectedGenre)),
    [selectedGenres]
  )

  const sortBySelectedSort = useCallback(
    (a: MALAnimeAnimeDTO, b: MALAnimeAnimeDTO) =>
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
      })[sortBySelected],
    [sortBySelected]
  )

  const resultSeasonAnimeList = useMemo(
    () => animeList.filter(filterByType).filter(filterByGenre).toSorted(sortBySelectedSort),
    [animeList, selectedGenres, sortBySelected, typeSelected]
  )

  const genres: MALGenre[] = useMemo(
    () =>
      animeList
        .flatMap(({ genres }) => genres)
        .filter((a): a is MALGenre => a !== undefined && a !== null)
        .filter((genre, idx, arr) => arr.findIndex(a => a.id === genre.id) === idx),
    [animeList]
  )

  return { seasonAnime: resultSeasonAnimeList, isGetSeasonPending, genres }
}

export default useSeason
