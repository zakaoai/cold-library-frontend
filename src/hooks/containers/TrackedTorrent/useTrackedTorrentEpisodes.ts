import AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react"

const useAnimeTorrentEpisodes = (malId: number, lastEpisodeOnServer: number) => {
  const [animeEpisodeTorrents, setAnimeEpisodeTorrents] = useState<AnimeEpisodeTorrentDisplay[]>([])

  // Get
  const {
    isFetched: allTorentsFetched,
    data: torrentsEpisode,
    isError: isErrorGetAnimeEpisodesTorrents
  } = useQuery<AnimeEpisodeTorrentDTO[], ResponseError>({
    queryKey: ["torrents", malId],
    queryFn: async () => await AnimeEpisodeTorrentService.getAnimeEpisodesTorrents(malId),
    retry: false
  })

  useEffect(() => {
    if (isErrorGetAnimeEpisodesTorrents) {
      console.error("Une erreur est survenue lors de la récupération des torrents de l'anime %s", malId)
    }
  }, [isErrorGetAnimeEpisodesTorrents, malId])

  useEffect(() => {
    if (allTorentsFetched && torrentsEpisode !== undefined) {
      setAnimeEpisodeTorrents(torrentsEpisode.map(episode => formatEpisode(episode)))
    }
  }, [allTorentsFetched, torrentsEpisode])

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

  // Scan All Episode
  const scanEpisodesCall = useCallback(async () => await AnimeEpisodeTorrentService.scanEpisodeTorrent(malId), [malId])

  const onSuccessScanEpisodes = useCallback(
    (newEpisodes: AnimeEpisodeTorrentDTO[]) => {
      setAnimeEpisodeTorrents(currentEpisodes => [
        ...currentEpisodes,
        ...newEpisodes.map(episode => formatEpisode(episode))
      ])
    },
    [setAnimeEpisodeTorrents]
  )

  const onErrorScanEpisodes = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors du scan des episodes de l'anime %s avec le status %s",
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { isPending: isScanEpisodesPending, mutate: scanEpisodes } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: scanEpisodesCall,
    onSuccess: onSuccessScanEpisodes,
    onError: onErrorScanEpisodes
  })

  // Search Pack
  const searchPackCall = useCallback(async () => await AnimeEpisodeTorrentService.scanPackTorrent(malId), [malId])

  const onSuccessSearchPack = useCallback(
    (newEpisode: AnimeEpisodeTorrentDTO) => {
      setAnimeEpisodeTorrents(currentEpisodes => [...currentEpisodes, formatEpisode(newEpisode)])
    },
    [setAnimeEpisodeTorrents]
  )

  const onErrorSearchPack = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors du scan du pack de l'anime %s avec le status %s",
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { isPending: isSearchPackPending, mutate: searchPack } = useMutation({
    mutationKey: ["torrent", malId, 0],
    mutationFn: searchPackCall,
    onSuccess: onSuccessSearchPack,
    onError: onErrorSearchPack
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

  // Scan Next
  const onSuccessScanNextEpisodeTorrent = useCallback(
    (animeEpisodeTorrent?: AnimeEpisodeTorrentDTO) => {
      if (animeEpisodeTorrent != undefined)
        setAnimeEpisodeTorrents(currentEpisodes => [...currentEpisodes, formatEpisode(animeEpisodeTorrent)])
    },
    [setAnimeEpisodeTorrents]
  )

  const onErrorScanNextEpisodeTorrent = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors du scan du prochain episode de l'anime %s avec le status %s",
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { isPending: isScanNextEpisodePending, mutate: scanNextEpisode } = useMutation<
    AnimeEpisodeTorrentDTO,
    ResponseError
  >({
    mutationFn: async () => await AnimeEpisodeTorrentService.scanNextEpisodeTorrent(malId),
    onSuccess: onSuccessScanNextEpisodeTorrent,
    onError: onErrorScanNextEpisodeTorrent
  })

  const isScanNextEpisodeAvaible = useMemo(
    () =>
      animeEpisodeTorrents.length === 0 ||
      animeEpisodeTorrents.sort((a, b) => a.episodeNumber - b.episodeNumber)[animeEpisodeTorrents.length - 1]
        .episodeNumber === lastEpisodeOnServer,
    [animeEpisodeTorrents, lastEpisodeOnServer]
  )

  return {
    animeEpisodeTorrents,
    isFetching: !allTorentsFetched,
    isScanEpisodesPending,
    scanEpisodes,
    isScanNextEpisodePending,
    isScanNextEpisodeAvaible,
    scanNextEpisode,
    isPatchTrackedAnimeEpisodePending,
    patchTrackedAnimeEpisode,
    isSearchPackPending,
    searchPack,
    isdDeleteTorrentPending,
    deleteTorrent,
    setAnimeEpisodeTorrents
  }
}

export default useAnimeTorrentEpisodes
