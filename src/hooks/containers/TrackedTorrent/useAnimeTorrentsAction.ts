import useAppContext from "@/hooks/context/useAppContext"
import DelugeEpisodeTorrent from "@/interfaces/services/AnimeEpisodeTorrentService/DelugeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

const useAnimeTorrentsAction = () => {
  const { setTorrentEpisodeLibrary } = useAppContext()

  // Scan All Episode
  const updateAllDelugeCall = useCallback(async () => await AnimeEpisodeTorrentService.delugeUpdateAll(), [])

  const onSuccessUpdateAllDeluge = useCallback(
    (delugeInformations: DelugeEpisodeTorrent[]) => {
      setTorrentEpisodeLibrary(currentEpisodes =>
        currentEpisodes.map(ep => {
          const delugeInfo = delugeInformations.find(delugeInfo => delugeInfo.idAnimeEpisodeTorrent === ep.id)
          if (delugeInfo !== undefined) {
            return { ...ep, progress: delugeInfo.progress }
          }
          return ep
        })
      )
    },
    [setTorrentEpisodeLibrary]
  )

  const onErrorUpdateAllDeluge = useCallback((error: ResponseError) => {
    console.error(
      "Une erreur est survenue lors de la mise à jour des état des torrents le status %s",
      error?.response?.status
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
