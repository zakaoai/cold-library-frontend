import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

const useAnimeEpisodeTorrentRow = (animeEpisodeTorrent: AnimeEpisodeTorrentDisplay) => {
  const { episodeNumber, torrentId, malId } = animeEpisodeTorrent

  const { setTorrentEpisodeLibrary } = useAppContext()

  const { updateTrackedAnime } = useAnimeTorrentContext()

  const {
    setSelectedEpisodeAlternate,
    setShowModalAlternateEpisode,
    animeTorrent: trackedTorrent
  } = useAnimeTorrentRowContext()

  const updateTrackedAnimeEpisode = useCallback(() => {
    AnimeTorrentService.update(malId, {
      ...trackedTorrent,
      lastEpisodeOnServer: episodeNumber
    }).then(updatedAnime => updateTrackedAnime(updatedAnime))
  }, [malId, trackedTorrent, episodeNumber, updateTrackedAnime])

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

  return { searchAlternate, nyaaLink, updateTrackedAnimeEpisode, deleteTorrent, isdDeleteTorrentPending }
}

export default useAnimeEpisodeTorrentRow
