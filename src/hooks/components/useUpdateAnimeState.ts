import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import { TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO"
import AnimeServices from "@/services/AnimeService"
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"

const useUpdateAnimeState = (
  malId: number,
  defaultAnime: AnimeDTO,
  updateAnime: (updatedAnime: Partial<AnimeDTO> & Pick<AnimeDTO, "malId">) => void
) => {
  const onSuccessUpdateAnime = useCallback((anime: AnimeDTO) => updateAnime(anime), [updateAnime])
  const onSuccesReset = useCallback(() => updateAnime(defaultAnime), [defaultAnime, updateAnime])

  // Update Last Avaible Episode
  const updateLastAvaibleEpisodeCall = useCallback(
    (lastAvaibleEpisode: number) => AnimeServices.updateLastAvaibleEpisode(malId, lastAvaibleEpisode),
    [malId]
  )

  const onErrorUpdateLastAvaibleEpisode = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la mise à jour du LastAvaibleEpisode de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateLastAvaibleEpisodePending, mutate: setLastAvaibleEpisode } = useMutation<
    AnimeDTO,
    ResponseError,
    number
  >({
    mutationFn: updateLastAvaibleEpisodeCall,
    onSuccess: onSuccessUpdateAnime,
    onError: onErrorUpdateLastAvaibleEpisode
  })

  // Update isComplete
  const updateIsCompleteCall = useCallback(
    (isComplete: boolean) => AnimeServices.updateIsComplete(malId, isComplete),
    [malId]
  )

  const onErrorUpdateIsComplete = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la mise à jour de l'état isComplete de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateIsCompletePending, mutate: setIsComplete } = useMutation<AnimeDTO, ResponseError, boolean>(
    {
      mutationFn: updateIsCompleteCall,
      onSuccess: onSuccessUpdateAnime,
      onError: onErrorUpdateIsComplete
    }
  )

  // Update Storage State
  const updateStorageStateCall = useCallback(
    (storageState: string) => AnimeServices.updateStorageState(malId, storageState),
    [malId]
  )

  const onErrorUpdateStorageState = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la mise à jour du storage state de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isUpdateStorageStatePending, mutate: setStorageState } = useMutation<
    AnimeDTO,
    ResponseError,
    string
  >({
    mutationFn: updateStorageStateCall,
    onSuccess: onSuccessUpdateAnime,
    onError: onErrorUpdateStorageState
  })

  // Delete Anime
  const deleteCall = useCallback(() => AnimeServices.delete(malId), [malId])

  const onErrorDelete = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la supression l'anime %s avec le status %s",
        malId,
        error.response.status
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
  const saveInLibraryCall = useCallback(() => AnimeServices.saveInLibrary(malId), [malId])

  const onErrorSaveInLibrary = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isSaveInLibraryPending, mutate: saveAnime } = useMutation<AnimeDTO, ResponseError>({
    mutationFn: saveInLibraryCall,
    onSuccess: onSuccessUpdateAnime,
    onError: onErrorSaveInLibrary
  })

  // Tracked Torrent Save
  const onSuccessTrackAnimeTorrent = useCallback(
    () =>
      updateAnime({
        malId,
        trackedTorrent: true
      }),
    [malId, updateAnime]
  )

  const trackAnimeTorrentCall = useCallback(() => TrackedAnimeTorrentService.saveInLibrary(malId), [malId])

  const onErrorTrackAnimeTorrent = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isTrackAnimeTorrentPending, mutate: trackAnimeTorrent } = useMutation<
    TrackedAnimeTorrentDTO,
    ResponseError
  >({
    mutationFn: trackAnimeTorrentCall,
    onSuccess: onSuccessTrackAnimeTorrent,
    onError: onErrorTrackAnimeTorrent
  })

  // Tracked Torrent Delete
  const onSuccessUntrackAnimeTorrent = useCallback(
    () =>
      updateAnime({
        malId,
        trackedTorrent: false
      }),
    [malId, updateAnime]
  )

  const untrackAnimeTorrentCall = useCallback(() => TrackedAnimeTorrentService.delete(malId), [malId])

  const onErrorUntrackAnimeTorrent = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
        malId,
        error.response.status
      )
    },
    [malId]
  )

  const { isPending: isUntrackAnimeTorrentPending, mutate: untrackAnimeTorrent } = useMutation<void, ResponseError>({
    mutationFn: untrackAnimeTorrentCall,
    onSuccess: onSuccessUntrackAnimeTorrent,
    onError: onErrorUntrackAnimeTorrent
  })

  const trackAnime = useCallback(
    (trackedTorrent: boolean) => (trackedTorrent ? trackAnimeTorrent() : untrackAnimeTorrent()),
    [trackAnimeTorrent, untrackAnimeTorrent]
  )

  const isTrackAnimePending = useMemo(
    () => isTrackAnimeTorrentPending || isUntrackAnimeTorrentPending,
    [isTrackAnimeTorrentPending, isUntrackAnimeTorrentPending]
  )

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
    trackAnime,
    isTrackAnimePending
  }
}

export default useUpdateAnimeState
