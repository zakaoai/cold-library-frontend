import { useMutation, useQuery } from "@tanstack/react-query"

import { type AnimeType } from "@/enums/AnimeType"
import StorageState from "@/enums/StorageState"
import UserAnimeStatus from "@/enums/UserAnimeStatus"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import AnimeServices from "@/services/AnimeService"
import UserService from "@/services/UserService"
import { useCallback, useEffect } from "react"
import useLibrary from "../../AnimeLibrary/useLibrary"

const useMyAnimeList = () => {
  const { animes: animeLibrary, updateAnime: updateAnimeInLibrary } = useLibrary()

  const { myAnimeList, setMyAnimeList, setUpdateAnimeStateFunction } = useMyAnimeListContext()

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
        ...(animeLibrary.find(({ malId }) => malAnime.id === malId) ?? {})
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
    if (data !== undefined && (myAnimeList === undefined || myAnimeList.length === 0))
      setMyAnimeList(data.sort(sortMALAnimeList).map(mappedMALAnime))
  }, [data, isFetched, mappedMALAnime])

  // Delete Anime
  const deleteCall = useCallback(async (defaultAnime: AnimeDTO) => {
    await AnimeServices.delete(defaultAnime.malId)
  }, [])

  const onErrorDelete = useCallback((error: ResponseError, defaultAnime: AnimeDTO) => {
    console.error(
      "Une erreur est survenue lors de la supression l'anime %s avec le status %s",
      defaultAnime.malId,
      error?.response?.status
    )
  }, [])

  const onSuccesReset = useCallback(
    (_: void, defaultAnime: AnimeDTO) => {
      updateAnimeInLibrary(defaultAnime)
      setMyAnimeList(prev =>
        prev.map(prevAnime => (prevAnime.id === defaultAnime.malId ? { ...prevAnime, ...defaultAnime } : prevAnime))
      )
    },
    [updateAnimeInLibrary]
  )

  const { isPending: isDeletePending, mutate: deleteAnime } = useMutation<void, ResponseError, AnimeDTO>({
    mutationFn: deleteCall,
    onSuccess: onSuccesReset,
    onError: onErrorDelete
  })

  // Save Anime
  const saveInLibraryCall = useCallback(async (malId: number) => await AnimeServices.saveInLibrary(malId), [])

  const onSuccessSaveInLibrary = useCallback(
    (anime: AnimeDTO) => {
      updateAnimeInLibrary(anime)

      setMyAnimeList(prev =>
        prev.map(prevAnime => (prevAnime.id === anime.malId ? { ...prevAnime, ...anime } : prevAnime))
      )
    },
    [updateAnimeInLibrary, setMyAnimeList]
  )

  const onErrorSaveInLibrary = useCallback((error: ResponseError, malId: number) => {
    console.error(
      "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
      malId,
      error?.response?.status
    )
  }, [])

  const { isPending: isSaveInLibraryPending, mutate: saveAnime } = useMutation<AnimeDTO, ResponseError, number>({
    mutationFn: saveInLibraryCall,
    onSuccess: onSuccessSaveInLibrary,
    onError: onErrorSaveInLibrary
  })

  // Update Storage State
  const updateStorageStateCall = useCallback(
    async ({ storageState, malId }: { storageState: string; malId: number }) =>
      await AnimeServices.updateStorageState(malId, storageState),
    []
  )

  const onErrorUpdateStorageState = useCallback((error: ResponseError, { malId }: { malId: number }) => {
    console.error(
      "Une erreur est survenue lors de la mise à jour du storage state de l'anime %s avec le status %s",
      malId,
      error?.response?.status
    )
  }, [])

  const onSuccessUpdateAnimeInServer = useCallback(
    (anime: AnimeInServerDTO) => {
      updateAnimeInLibrary(anime)
      setMyAnimeList(prev =>
        prev.map(prevAnime => (prevAnime.id === anime.malId ? { ...prevAnime, ...anime } : prevAnime))
      )
    },
    [updateAnimeInLibrary]
  )

  const { isPending: isUpdateStorageStatePending, mutate: setStorageState } = useMutation<
    AnimeInServerDTO,
    ResponseError,
    { storageState: string; malId: number }
  >({
    mutationFn: updateStorageStateCall,
    onSuccess: onSuccessUpdateAnimeInServer,
    onError: onErrorUpdateStorageState
  })

  const updateAnime = useCallback(
    (anime: AnimeDTO) => {
      if (!isUpdateStorageStatePending && !isSaveInLibraryPending && !isDeletePending) {
        const { storageState } = anime
        if (storageState === undefined) {
          saveAnime(anime.malId)
        }
        if (storageState === StorageState.FLUX_FROID) {
          setStorageState({ storageState: StorageState.FLUX_CHAUD, malId: anime.malId })
        }
        if (storageState === StorageState.FLUX_CHAUD) {
          deleteAnime({ ...anime, storageState: undefined, addedOnServer: undefined })
        }
      }
    },
    [isUpdateStorageStatePending, isSaveInLibraryPending, isDeletePending]
  )

  useEffect(() => {
    setUpdateAnimeStateFunction(() => updateAnime)
  }, [updateAnime])

  return { myAnimeList, isFetching }
}

export default useMyAnimeList
