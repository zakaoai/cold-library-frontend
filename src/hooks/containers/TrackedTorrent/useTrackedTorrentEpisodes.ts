import { type AnimeEpisodeTorrentDisplay } from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react"

const useTrackedTorrentEpisodes = (malId: number, lastEpisodeOnServer: number) => {
  const [episodes, setEpisodes] = useState<AnimeEpisodeTorrentDisplay[]>([])

  // Get
  const { isFetched: allTorentsFetched, data: torrentsEpisode } = useQuery({
    queryKey: ["torrents", malId],
    queryFn: async () => await AnimeEpisodeTorrentService.getAnimeEpisodesTorrents(malId),
    retry: false
  })

  useEffect(() => {
    if (allTorentsFetched && torrentsEpisode !== undefined) {
      setEpisodes(torrentsEpisode.map(episode => formatEpisode(episode)))
    }
  }, [allTorentsFetched, torrentsEpisode])

  // Patch Episode
  const patchTrackedAnimeEpisodeCall = useCallback(
    async (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
      await AnimeEpisodeTorrentService.replaceEpisodeTorrent(malId, animeEpisodeTorrent),
    []
  )

  const onSuccessPatchTrackedAnimeEpisode = useCallback(
    (updatedEpisode: AnimeEpisodeTorrentDTO) => {
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        formatEpisode(updatedEpisode)
      ])
    },
    [setEpisodes]
  )

  const onErroPatchTrackedAnimeEpisode = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId)
  }, [])

  const { isPending: isPatchTrackedAnimeEpisodePending, mutate: patchTrackedAnimeEpisode } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: patchTrackedAnimeEpisodeCall,
    onSuccess: onSuccessPatchTrackedAnimeEpisode,
    onError: onErroPatchTrackedAnimeEpisode
  })

  // Scan All Episode
  const scanEpisodesCall = useCallback(async () => await AnimeEpisodeTorrentService.scanEpisodeTorrent(malId), [])

  const onSuccessScanEpisodes = useCallback(
    (newEpisodes: AnimeEpisodeTorrentDTO[]) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, ...newEpisodes.map(episode => formatEpisode(episode))])
    },
    [setEpisodes]
  )

  const onErrorScanEpisodes = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId)
  }, [])

  const { isPending: isScanEpisodesPending, mutate: scanEpisodes } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: scanEpisodesCall,
    onSuccess: onSuccessScanEpisodes,
    onError: onErrorScanEpisodes
  })

  // Search Pack
  const searchPackCall = useCallback(async () => await AnimeEpisodeTorrentService.scanPackTorrent(malId), [])

  const onSuccessSearchPack = useCallback(
    (newEpisode: AnimeEpisodeTorrentDTO) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(newEpisode)])
    },
    [setEpisodes]
  )

  const onErrorSearchPack = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId)
  }, [])

  const { isPending: isSearchPackPending, mutate: searchPack } = useMutation({
    mutationKey: ["torrent", malId, 0],
    mutationFn: searchPackCall,
    onSuccess: onSuccessSearchPack,
    onError: onErrorSearchPack
  })

  // Delete
  const deleteTorrentCall = useCallback(
    async (episodeNumber: number) => await AnimeEpisodeTorrentService.deleteTorrent(malId, episodeNumber),
    []
  )

  const onSuccessDeleteTorrent = useCallback(
    (_: void, episodeNumber: number) => {
      setEpisodes(episodes => episodes.filter(ep => ep.episodeNumber !== episodeNumber))
    },
    [setEpisodes]
  )

  const onErrorDeleteTorrent = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId)
  }, [])

  const { isPending: isdDeleteTorrentPending, mutate: deleteTorrent } = useMutation({
    mutationFn: deleteTorrentCall,
    onSuccess: onSuccessDeleteTorrent,
    onError: onErrorDeleteTorrent
  })

  // Scan Next
  const onSuccessScanNextEpisodeTorrent = useCallback(
    (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(animeEpisodeTorrent)])
    },
    [setEpisodes]
  )

  const onErrorScanNextEpisodeTorrent = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId)
  }, [])

  const { isPending: isScanNextEpisodePending, mutate: scanNextEpisode } = useMutation<
    AnimeEpisodeTorrentDTO,
    unknown,
    string
  >({
    mutationFn: async () => await AnimeEpisodeTorrentService.scanNextEpisodeTorrent(malId),
    onSuccess: onSuccessScanNextEpisodeTorrent,
    onError: onErrorScanNextEpisodeTorrent
  })

  const isScanNextEpisodeAvaible = useMemo(
    () =>
      episodes.length === 0 ||
      episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)[episodes.length - 1].episodeNumber ===
        lastEpisodeOnServer,
    [episodes]
  )

  return {
    episodes,
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
    setEpisodes
  }
}

export default useTrackedTorrentEpisodes
