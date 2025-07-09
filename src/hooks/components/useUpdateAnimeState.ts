import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import AnimeServices from "@/services/AnimeService"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback } from "react"
import useAppContext from "../context/useAppContext"

const useUpdateAnimeState = (
  malId: number,
  defaultAnime: AnimeDTO,
  updateAnime: (updatedAnime: AnimeDTO | AnimeInServerDTO) => void
) => {
  const { enqueueSnackbar } = useSnackbar()

  const onSuccessUpdateAnimeInServer = useCallback(
    (anime: AnimeInServerDTO) => {
      updateAnime(anime)
    },
    [updateAnime]
  )
  const onSuccesReset = useCallback(() => {
    updateAnime(defaultAnime)
  }, [defaultAnime, updateAnime])
  const { setTorrentEpisodeLibrary, setTorrentLibrary, setAnimeLibrary } = useAppContext()

  // Update Last Avaible Episode
  const updateLastAvaibleEpisodeCall = useCallback(
    async (lastAvaibleEpisode: number) => await AnimeServices.updateLastAvaibleEpisode(malId, lastAvaibleEpisode),
    [malId]
  )

  const onErrorUpdateLastAvaibleEpisode = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la mise à jour du LastAvaibleEpisode de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la mise à jour du LastAvaibleEpisode de l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateLastAvaibleEpisodePending, mutate: setLastAvaibleEpisode } = useMutation<
    AnimeInServerDTO,
    ResponseError,
    number
  >({
    mutationFn: updateLastAvaibleEpisodeCall,
    onSuccess: onSuccessUpdateAnimeInServer,
    onError: onErrorUpdateLastAvaibleEpisode
  })

  // Update isComplete
  const updateIsCompleteCall = useCallback(
    async (isComplete: boolean) => await AnimeServices.updateIsComplete(malId, isComplete),
    [malId]
  )

  const onErrorUpdateIsComplete = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la mise à jour de l'état isComplete de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la mise à jour de l'état isComplete de l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateIsCompletePending, mutate: setIsComplete } = useMutation<
    AnimeInServerDTO,
    ResponseError,
    boolean
  >({
    mutationFn: updateIsCompleteCall,
    onSuccess: onSuccessUpdateAnimeInServer,
    onError: onErrorUpdateIsComplete
  })

  // Update Storage State
  const updateStorageStateCall = useCallback(
    async (storageState: string) => await AnimeServices.updateStorageState(malId, storageState),
    [malId]
  )

  const onErrorUpdateStorageState = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la mise à jour du storage state de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la mise à jour du storage state de l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateStorageStatePending, mutate: setStorageState } = useMutation<
    AnimeInServerDTO,
    ResponseError,
    string
  >({
    mutationFn: updateStorageStateCall,
    onSuccess: onSuccessUpdateAnimeInServer,
    onError: onErrorUpdateStorageState
  })

  // Update is Downloading
  const updateIsDownloadingCall = useCallback(
    async (isDownloading: boolean) => await AnimeServices.updateIsDownloading(malId, isDownloading),
    [malId]
  )

  const onErrorUpdateIsDownloading = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la mise à jour de l'état isDownloading de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la mise à jour de l'état isDownloading de l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const onSucessUpdateIsDownloading = useCallback(
    (anime: AnimeInServerDTO) => {
      updateAnime(anime)
      setTorrentEpisodeLibrary([])
      setTorrentLibrary([])
    },
    [updateAnime, setTorrentEpisodeLibrary, setTorrentLibrary]
  )

  const { isPending: isUpdateIsDownloadingPending, mutate: setIsDownloading } = useMutation<
    AnimeInServerDTO,
    ResponseError,
    boolean
  >({
    mutationFn: updateIsDownloadingCall,
    onSuccess: onSucessUpdateIsDownloading,
    onError: onErrorUpdateIsDownloading
  })

  // Delete Anime
  const deleteCall = useCallback(async () => {
    await AnimeServices.delete(malId)
  }, [malId])

  const onErrorDelete = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de la suppression de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la supression l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const { isPending: isDeletePending, mutate: deleteAnime } = useMutation<void, ResponseError>({
    mutationFn: deleteCall,
    onSuccess: onSuccesReset,
    onError: onErrorDelete
  })

  // Save Anime
  const saveInLibraryCall = useCallback(async () => await AnimeServices.saveInLibrary(malId), [malId])

  const onSuccessSaveInLibrary = useCallback(
    (anime: AnimeDTO) => {
      updateAnime(anime)

      setAnimeLibrary(prev =>
        anime.addedOnServer !== undefined ? [...prev, anime] : prev.filter(curr => curr.malId !== anime.malId)
      )
    },
    [setAnimeLibrary, updateAnime]
  )

  const onErrorSaveInLibrary = useCallback(
    (error: ResponseError) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors de l'enregistrement de l'anime",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
        malId,
        error.response?.status
      )
    },
    [malId]
  )

  const { isPending: isSaveInLibraryPending, mutate: saveAnime } = useMutation<AnimeDTO, ResponseError>({
    mutationFn: saveInLibraryCall,
    onSuccess: onSuccessSaveInLibrary,
    onError: onErrorSaveInLibrary
  })

  return {
    setLastAvaibleEpisode,
    isUpdateLastAvaibleEpisodePending,
    setIsComplete,
    isUpdateIsCompletePending,
    setStorageState,
    isUpdateStorageStatePending,
    deleteAnime,
    isDeletePending,
    saveAnime,
    isSaveInLibraryPending,
    setIsDownloading,
    isUpdateIsDownloadingPending
  }
}

export default useUpdateAnimeState
