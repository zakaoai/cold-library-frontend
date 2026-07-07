import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import type { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback, useMemo } from "react"

const useAnimeTorrentEpisodes = (malId: number) => {
  const { torrentEpisodesMap, isTorrentEpisodesFetching } = useAnimeTorrentContext()

  const queryClient = useQueryClient()

  const { enqueueSnackbar } = useSnackbar()

  const animeEpisodeTorrents = useMemo(
    () => torrentEpisodesMap.get(malId)?.map(episode => formatEpisode(episode)) ?? [],
    [malId, torrentEpisodesMap]
  )

  // Patch Episode
  const patchTrackedAnimeEpisodeCall = useCallback(
    async (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
      await AnimeEpisodeTorrentService.replaceEpisodeTorrent(malId, animeEpisodeTorrent),
    [malId]
  )

  const onSuccessPatchTrackedAnimeEpisode = useCallback(
    (updatedEpisode: AnimeEpisodeTorrentDTO) => {
      queryClient.setQueryData<AnimeEpisodeTorrentDTO[]>(["torrentEpisodesLibrary"], episodes => {
        episodes ??= []
        if (episodes.length === 0) return episodes
        Object.assign(
          episodes.find(ep => ep.malId === malId && ep.episodeNumber === updatedEpisode.episodeNumber) ?? {},
          updatedEpisode
        )
        return episodes
      })
    },
    [queryClient]
  )

  const onErrorPatchTrackedAnimeEpisode = useCallback(
    (error: ResponseError, episode: AnimeEpisodeTorrentDTO) => {
      enqueueSnackbar({
        message: "Une erreur est survenue lors du patch de l'épisode",
        variant: "error"
      })
      console.error(
        "Une erreur est survenue lors du patch de l'episode %s tracked de l'anime %s avec le status %s",
        episode.episodeNumber,
        malId,
        error.response?.status
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

  return {
    animeEpisodeTorrents,
    isFetching: isTorrentEpisodesFetching,
    isPatchTrackedAnimeEpisodePending,
    patchTrackedAnimeEpisode
  }
}

export default useAnimeTorrentEpisodes
