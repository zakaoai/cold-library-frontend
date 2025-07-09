import { useMutation } from "@tanstack/react-query"

import StorageState from "@/enums/StorageState"
import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import AnimeServices from "@/services/AnimeService"
import { useSnackbar } from "notistack"
import { useCallback } from "react"

type AnimeLight = Partial<AnimeInServerDTO> & Pick<AnimeInServerDTO, "malId">

const useUpdateAnimeStorageStateLight = (callback?: (anime: AnimeDTO | AnimeLight) => void) => {
  const { setAnimeLibrary } = useAppContext()

  const { enqueueSnackbar } = useSnackbar()

  // Delete Anime
  const deleteCall = useCallback(async (defaultAnime: AnimeLight) => {
    await AnimeServices.delete(defaultAnime.malId)
  }, [])

  const onErrorDelete = useCallback(
    (error: ResponseError, defaultAnime: AnimeLight) => {
      enqueueSnackbar({
        message: `Erreur lors de la suppression de l'anime (id: ${defaultAnime.malId})`,
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors de la supression l'anime %s avec le status %s",
        defaultAnime.malId,
        error.response?.status
      )
    },
    [enqueueSnackbar]
  )

  const onSuccesReset = useCallback(
    (_: void, defaultAnime: AnimeLight) => {
      setAnimeLibrary(prev => prev.filter(({ malId }) => defaultAnime.malId !== malId))
      callback?.(defaultAnime)
    },
    [callback, setAnimeLibrary]
  )

  const { isPending: isDeletePending, mutate: deleteAnime } = useMutation<void, ResponseError, AnimeLight>({
    mutationFn: deleteCall,
    onSuccess: onSuccesReset,
    onError: onErrorDelete
  })

  // Save Anime
  const saveInLibraryCall = useCallback(async (malId: number) => await AnimeServices.saveInLibrary(malId), [])

  const onSuccessSaveInLibrary = useCallback(
    (anime: AnimeDTO) => {
      setAnimeLibrary(prev => [...prev, anime])
      callback?.(anime)
    },
    [setAnimeLibrary, callback]
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
      setAnimeLibrary(prev => prev.map(a => (a.malId === anime.malId ? { ...a, ...anime } : a)))
      callback?.(anime)
    },
    [setAnimeLibrary, callback]
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

  const updateAnime = useCallback((anime: AnimeLight) => {
    if (!isUpdateStorageStatePending && !isSaveInLibraryPending && !isDeletePending) {
      const { storageState } = anime
      if (storageState === undefined) {
        saveAnime(anime.malId)
      }
      if (storageState === StorageState.FLUX_FROID) {
        setStorageState({ storageState: StorageState.FLUX_CHAUD, malId: anime.malId })
      }
      if (storageState === StorageState.FLUX_CHAUD) {
        deleteAnime(anime)
      }
    }
  }, [])

  return { updateAnime }
}

export default useUpdateAnimeStorageStateLight
