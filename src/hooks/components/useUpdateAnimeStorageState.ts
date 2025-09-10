import { useMutation } from "@tanstack/react-query"

import StorageState from "@/enums/StorageState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import AnimeServices from "@/services/AnimeService"
import { useSnackbar } from "notistack"
import { useCallback } from "react"
import useLibrary from "../containers/AnimeLibrary/useLibrary"

const useUpdateAnimeStorageState = (callback?: (anime: AnimeDTO | AnimeInServerDTO) => void) => {
  const { updateAnime: updateAnimeInLibrary } = useLibrary()

  const { enqueueSnackbar } = useSnackbar()

  // Delete Anime
  const deleteCall = useCallback(async (defaultAnime: AnimeDTO) => {
    await AnimeServices.delete(defaultAnime.malId)
  }, [])

  const onErrorDelete = useCallback((error: ResponseError, defaultAnime: AnimeDTO) => {
    console.error(
      "Une erreur est survenue lors de la supression l'anime %s avec le status %s",
      defaultAnime.malId,
      error.response?.status
    )
  }, [])

  const onSuccesReset = useCallback(
    (_: void, defaultAnime: AnimeDTO) => {
      updateAnimeInLibrary(defaultAnime)
      callback?.(defaultAnime)
    },
    [callback, updateAnimeInLibrary]
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
      callback?.(anime)
    },
    [updateAnimeInLibrary, callback]
  )

  const onErrorSaveInLibrary = useCallback((error: ResponseError, malId: number) => {
    enqueueSnackbar({
      message: "Une erreur est survenue lors de l'enregistrement de l'anime",
      variant: "error"
    })
    console.error(
      "Une erreur est survenue lors de l'enregistrement de l'anime %s avec le status %s",
      malId,
      error.response?.status
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
    enqueueSnackbar({
      message: "Une erreur est survenue lors de la mise à jour du storage state de l'anime",
      variant: "error"
    })
    console.error(
      "Une erreur est survenue lors de la mise à jour du storage state de l'anime %s avec le status %s",
      malId,
      error.response?.status
    )
  }, [])

  const onSuccessUpdateAnimeInServer = useCallback(
    (anime: AnimeInServerDTO) => {
      updateAnimeInLibrary(anime)
      callback?.(anime)
    },
    [updateAnimeInLibrary, callback]
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

  const updateAnime = useCallback((anime: AnimeDTO) => {
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
  }, [])

  return { updateAnime }
}

export default useUpdateAnimeStorageState
