import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import type DelugeEpisodeTorrent from "@/interfaces/services/AnimeEpisodeTorrentService/DelugeEpisodeTorrentDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback } from "react"

const useAnimeTorrentsAction = () => {
  const queryClient = useQueryClient()

  const { enqueueSnackbar } = useSnackbar()

  // Scan All Episode
  const updateAllDelugeCall = useCallback(async () => await AnimeEpisodeTorrentService.delugeUpdateAll(), [])

  const onSuccessUpdateAllDeluge = useCallback(
    (delugeInformations: DelugeEpisodeTorrent[]) => {
      queryClient.setQueryData<AnimeEpisodeTorrentDTO[]>(["torrentEpisodesLibrary"], currentEpisodes =>
        (currentEpisodes ?? []).map(ep => {
          const delugeInfo = delugeInformations.find(delugeInfo => delugeInfo.torrentId === ep.torrentId)
          if (delugeInfo !== undefined) {
            return { ...ep, progress: delugeInfo.progress }
          }
          return ep
        })
      )
    },
    [queryClient]
  )

  const onErrorUpdateAllDeluge = useCallback((error: ResponseError) => {
    enqueueSnackbar({
      message: "Une erreur est survenue lors de la mise à jour des état des torrents",
      variant: "error"
    })
    console.error(
      "Une erreur est survenue lors de la mise à jour des état des torrents le status %s",
      error.response?.status
    )
  }, [])

  const { isPending: isUpdateAllDelugePending, mutate: updateAllDeluge } = useMutation({
    mutationKey: ["deluge"],
    mutationFn: updateAllDelugeCall,
    onSuccess: onSuccessUpdateAllDeluge,
    onError: onErrorUpdateAllDeluge
  })

  return {
    isUpdateAllDelugePending,
    updateAllDeluge
  }
}

export default useAnimeTorrentsAction
