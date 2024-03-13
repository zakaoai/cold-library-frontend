import useAppContext from "@/hooks/context/useAppContext"
import DelugeEpisodeTorrent from "@/interfaces/services/AnimeEpisodeTorrentService/DelugeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

const useDownloadDelugeAction = (malId: number, episodeNumber: number) => {
  const { setTorrentEpisodeLibrary } = useAppContext()

  const onSuccessDownloadDelugeTorrent = useCallback(
    (delugeEpisodeTorrent: DelugeEpisodeTorrent) => {
      setTorrentEpisodeLibrary(prev =>
        prev.map(ep =>
          ep.torrentId === delugeEpisodeTorrent.torrentId ? { ...ep, progress: delugeEpisodeTorrent?.progress } : ep
        )
      )
    },
    [setTorrentEpisodeLibrary]
  )

  const onErrorDownloadDelugeTorrent = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors du téléchargement via deluge de l'episode %s tracked de l'anime %s avec le status %s",
        episodeNumber,
        malId,
        error?.response?.status
      )
    },
    [episodeNumber, malId]
  )

  const delugeDownloadCall = useCallback(
    async () => await AnimeEpisodeTorrentService.delugeDownload(malId, episodeNumber),
    [episodeNumber, malId]
  )

  const { isPending: isDownloadDelugeTorrentPending, mutate: downloadDeluge } = useMutation<
    DelugeEpisodeTorrent,
    ResponseError
  >({
    mutationFn: delugeDownloadCall,
    onSuccess: onSuccessDownloadDelugeTorrent,
    onError: onErrorDownloadDelugeTorrent
  })

  const updateDelugeInformationCall = useCallback(
    async () => await AnimeEpisodeTorrentService.delugeUpdate(malId, episodeNumber),
    [episodeNumber, malId]
  )

  const { isPending: isUpdateDelugeInformationPending, mutate: updateDelugeInformation } = useMutation<
    DelugeEpisodeTorrent,
    ResponseError
  >({
    mutationFn: updateDelugeInformationCall,
    onSuccess: onSuccessDownloadDelugeTorrent,
    onError: onErrorDownloadDelugeTorrent
  })

  return { isDownloadDelugeTorrentPending, downloadDeluge, isUpdateDelugeInformationPending, updateDelugeInformation }
}

export default useDownloadDelugeAction
