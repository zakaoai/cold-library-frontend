import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useAnimeTorrentEpisodes = (malId: number) => {
  const { torrentEpisodesMap, isTorrentEpisodesFetching } = useAnimeTorrentContext()
  const [animeEpisodeTorrents, setAnimeEpisodeTorrents] = useState<AnimeEpisodeTorrentDisplay[]>([])

  useEffect(() => {
    setAnimeEpisodeTorrents(torrentEpisodesMap.get(malId)?.map(episode => formatEpisode(episode)) || [])
  }, [malId, torrentEpisodesMap])

  // Patch Episode
  const patchTrackedAnimeEpisodeCall = useCallback(
    async (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
      await AnimeEpisodeTorrentService.replaceEpisodeTorrent(malId, animeEpisodeTorrent),
    [malId]
  )

  const onSuccessPatchTrackedAnimeEpisode = useCallback(
    (updatedEpisode: AnimeEpisodeTorrentDTO) => {
      setAnimeEpisodeTorrents(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        formatEpisode(updatedEpisode)
      ])
    },
    [setAnimeEpisodeTorrents]
  )

  const onErrorPatchTrackedAnimeEpisode = useCallback(
    (error: ResponseError, episode: AnimeEpisodeTorrentDTO) => {
      console.error(
        "Une erreur est survenue lors du patch de l'episode %s tracked de l'anime %s avec le status %s",
        episode.episodeNumber,
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { isPending: isPatchTrackedAnimeEpisodePending, mutate: patchTrackedAnimeEpisode } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: patchTrackedAnimeEpisodeCall,
    onSuccess: onSuccessPatchTrackedAnimeEpisode,
    onError: onErrorPatchTrackedAnimeEpisode
  })

  // Delete
  const deleteTorrentCall = useCallback(
    async (episodeNumber: number) => await AnimeEpisodeTorrentService.deleteTorrent(malId, episodeNumber),
    [malId]
  )

  const onSuccessDeleteTorrent = useCallback(
    (_: void, episodeNumber: number) => {
      setAnimeEpisodeTorrents(episodes => episodes.filter(ep => ep.episodeNumber !== episodeNumber))
    },
    [setAnimeEpisodeTorrents]
  )

  const onErrorDeleteTorrent = useCallback(
    (error: ResponseError, episodeNumber: number) => {
      console.error(
        "Une erreur est survenue lors de la supression du torrent episode %s de l'anime %s avec le status %s",
        episodeNumber,
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { isPending: isdDeleteTorrentPending, mutate: deleteTorrent } = useMutation<void, ResponseError, number>({
    mutationFn: deleteTorrentCall,
    onSuccess: onSuccessDeleteTorrent,
    onError: onErrorDeleteTorrent
  })

  return {
    animeEpisodeTorrents,
    isFetching: isTorrentEpisodesFetching,
    isPatchTrackedAnimeEpisodePending,
    patchTrackedAnimeEpisode,
    isdDeleteTorrentPending,
    deleteTorrent,
    setAnimeEpisodeTorrents
  }
}

export default useAnimeTorrentEpisodes
