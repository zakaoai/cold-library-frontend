import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

const useAnimeEpisodeTorrentRow = (animeEpisodeTorrent: AnimeEpisodeTorrentDisplay) => {
  const { episodeNumber, torrentId, malId } = animeEpisodeTorrent

  const { setTorrentEpisodeLibrary } = useAppContext()

  const { updateTrackedAnime } = useAnimeTorrentContext()

  const { setSelectedEpisodeAlternate, setShowModalAlternateEpisode } = useAnimeTorrentRowContext()

  const updateLastEpisodeOnServerCall = useCallback(
    () => AnimeTorrentService.updateLastEpisodeOnServer(malId, episodeNumber),
    [episodeNumber, malId]
  )

  const onSuccessUpdateLastEpisodeOnServer = useCallback(
    (updatedAnime: AnimeTorrentDTO) => {
      updateTrackedAnime(updatedAnime)
    },
    [updateTrackedAnime]
  )

  const onErrorUpdateLastEpisodeOnServer = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la mise à jour du lastEpisodeOnServer de l'anime %s avec un status %s",
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { mutate: updateLastEpisodeOnServer } = useMutation<AnimeTorrentDTO, ResponseError>({
    mutationFn: updateLastEpisodeOnServerCall,
    onSuccess: onSuccessUpdateLastEpisodeOnServer,
    onError: onErrorUpdateLastEpisodeOnServer
  })

  const searchAlternate = useCallback(() => {
    setSelectedEpisodeAlternate(animeEpisodeTorrent)
    setShowModalAlternateEpisode(true)
  }, [setSelectedEpisodeAlternate, setShowModalAlternateEpisode, animeEpisodeTorrent])

  const nyaaLink = `https://nyaa.si/view/${torrentId}`

  const deleteTorrentCall = useCallback(
    async () => await AnimeEpisodeTorrentService.deleteTorrent(malId, episodeNumber),
    [episodeNumber, malId]
  )

  const onSuccessDeleteTorrent = useCallback(() => {
    setTorrentEpisodeLibrary(episodes =>
      episodes.filter(ep => !(ep.episodeNumber === episodeNumber && ep.malId === malId))
    )
  }, [episodeNumber, malId, setTorrentEpisodeLibrary])

  const onErrorDeleteTorrent = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la supression du torrent episode %s de l'anime %s avec le status %s",
        episodeNumber,
        malId,
        error?.response?.status
      )
    },
    [episodeNumber, malId]
  )

  const { isPending: isdDeleteTorrentPending, mutate: deleteTorrent } = useMutation<void, ResponseError>({
    mutationFn: deleteTorrentCall,
    onSuccess: onSuccessDeleteTorrent,
    onError: onErrorDeleteTorrent
  })

  return { searchAlternate, nyaaLink, updateLastEpisodeOnServer, deleteTorrent, isdDeleteTorrentPending }
}

export default useAnimeEpisodeTorrentRow
