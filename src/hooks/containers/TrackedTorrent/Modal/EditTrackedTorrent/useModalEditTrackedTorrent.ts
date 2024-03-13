import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import useAppContext from "@/hooks/context/useAppContext"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

const useModalEditTrackedTorrent = () => {
  const {
    editableTrackedAnime,
    updateTrackedAnime: patchAnime,
    setShowModal,
    setEditableTrackedAnime,
    showModal: open
  } = useAnimeTorrentContext()

  const { animeLibrary } = useAppContext()

  const anime = animeLibrary.find(anime => anime.malId === editableTrackedAnime?.malId)
  const { title } = anime || {}
  const { searchWords, lastEpisodeOnServer, dayOfRelease, deltaEpisode, torrentPath } = editableTrackedAnime || {}

  const handleClose = useCallback(() => {
    setShowModal(false)
    setEditableTrackedAnime(undefined)
  }, [setEditableTrackedAnime, setShowModal])

  const updateTrackedTorrentCall = useCallback(
    (trackedAnime: AnimeTorrentDTO) => AnimeTorrentService.update(trackedAnime.malId, trackedAnime),
    []
  )

  const onSuccessUpdateTrackedTorrent = useCallback(
    (updatedTrackedTorrent: AnimeTorrentDTO) => {
      patchAnime(updatedTrackedTorrent)
    },
    [patchAnime]
  )

  const onErrorUpdateTrackedTorrent = useCallback((error: ResponseError, trackedAnime: AnimeTorrentDTO) => {
    console.error(
      "Une erreur est survenue lors de la mise à jour des informations du torrent de l'anime %s de l'anime %s avec le status %s",

      trackedAnime.malId,
      error?.response?.status
    )
  }, [])

  const { mutate: updateTrackedAnime } = useMutation<AnimeTorrentDTO, ResponseError, AnimeTorrentDTO>({
    mutationFn: updateTrackedTorrentCall,
    onSuccess: onSuccessUpdateTrackedTorrent,
    onError: onErrorUpdateTrackedTorrent
  })

  const defaultValues = {
    searchWords,
    lastEpisodeOnServer,
    dayOfRelease,
    deltaEpisode,
    torrentPath
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Omit<AnimeTorrentDTO, "malId">>({ defaultValues })

  const onSubmit = useCallback(
    ({ searchWords, dayOfRelease, lastEpisodeOnServer, deltaEpisode, torrentPath }: Omit<AnimeTorrentDTO, "malId">) => {
      if (editableTrackedAnime != undefined)
        updateTrackedAnime({
          ...editableTrackedAnime,
          searchWords,
          dayOfRelease,
          lastEpisodeOnServer,
          deltaEpisode,
          torrentPath
        })
      handleClose()
    },
    [updateTrackedAnime, editableTrackedAnime, handleClose]
  )

  return { control, register, handleSubmit, errors, title, open, onSubmit, handleClose }
}

export default useModalEditTrackedTorrent
