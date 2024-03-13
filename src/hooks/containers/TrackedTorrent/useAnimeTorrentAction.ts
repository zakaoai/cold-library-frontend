import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef } from "react"

const useAnimeTorrentAction = () => {
  const {
    setEditableTrackedAnime,
    setShowModal: setShowModalTrackedAnime,
    doScan,
    doScanNext
  } = useAnimeTorrentContext()

  const prevDoScan = useRef(doScan)
  const prevDoScanNext = useRef(doScanNext)

  const { animeTorrent: trackedTorrent, animeEpisodeTorrents, anime } = useAnimeTorrentRowContext()
  const { lastEpisodeOnServer, malId } = trackedTorrent
  const { episodes } = anime || {}
  const { setTorrentEpisodeLibrary } = useAppContext()

  // Scan All Episode
  const scanEpisodesCall = useCallback(async () => await AnimeEpisodeTorrentService.scanEpisodeTorrent(malId), [malId])

  const onSuccessScanEpisodes = useCallback(
    (newEpisodes: AnimeEpisodeTorrentDTO[]) => {
      setTorrentEpisodeLibrary(currentEpisodes => [
        ...currentEpisodes,
        ...newEpisodes.map(episode => formatEpisode(episode))
      ])
    },
    [setTorrentEpisodeLibrary]
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
      setTorrentEpisodeLibrary(currentEpisodes => [...currentEpisodes, formatEpisode(newEpisode)])
    },
    [setTorrentEpisodeLibrary]
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

  const onSuccessScanNextEpisodeTorrent = useCallback(
    (animeEpisodeTorrent?: AnimeEpisodeTorrentDTO) => {
      if (animeEpisodeTorrent != undefined)
        setTorrentEpisodeLibrary(currentEpisodes => [...currentEpisodes, formatEpisode(animeEpisodeTorrent)])
    },
    [setTorrentEpisodeLibrary]
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

  const scanNextEpisodeCall = useCallback(() => AnimeEpisodeTorrentService.scanNextEpisodeTorrent(malId), [malId])

  const { isPending: isScanNextEpisodePending, mutate: scanNextEpisode } = useMutation<
    AnimeEpisodeTorrentDTO,
    ResponseError
  >({
    mutationFn: scanNextEpisodeCall,
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

  useEffect(() => {
    if (doScan != prevDoScan.current && !isScanEpisodesPending) {
      prevDoScan.current = Boolean(doScan)
      scanEpisodes()
    }
  }, [doScan, isScanEpisodesPending, prevDoScan, scanEpisodes])

  useEffect(() => {
    if (doScanNext != prevDoScanNext.current && isScanNextEpisodeAvaible && !isScanNextEpisodePending) {
      scanNextEpisode()
      prevDoScanNext.current = Boolean(doScanNext)
    }
  }, [doScanNext, isScanNextEpisodeAvaible, isScanNextEpisodePending, prevDoScanNext, scanNextEpisode])

  const editTrackedAnime = useCallback(() => {
    setEditableTrackedAnime(trackedTorrent)
    setShowModalTrackedAnime(true)
  }, [setEditableTrackedAnime, setShowModalTrackedAnime, trackedTorrent])

  const isNewEpisode =
    animeEpisodeTorrents.filter(({ episodeNumber }) => episodeNumber > lastEpisodeOnServer).length > 0

  const isComplete = animeEpisodeTorrents.findIndex(({ episodeNumber }) => episodeNumber === episodes) !== -1

  const isPackInList = animeEpisodeTorrents.findIndex(({ episodeNumber }) => episodeNumber === 0) !== -1

  return {
    isNewEpisode,
    isComplete,
    isPackInList,
    searchPack,
    scanEpisodes,
    scanNextEpisode,
    editTrackedAnime,
    isScanEpisodesPending,
    isScanNextEpisodeAvaible,
    isScanNextEpisodePending,
    isSearchPackPending
  }
}

export default useAnimeTorrentAction
