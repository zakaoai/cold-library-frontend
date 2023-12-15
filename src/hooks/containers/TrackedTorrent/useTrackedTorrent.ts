import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO"
import AnimeServices from "@/services/AnimeService"
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService"
import { useQueries, type QueryObserverResult } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

export default function useTrackedTorrent() {
  const [trackedTorrents, setTrackedTorrents] = useState<Array<TrackedAnimeTorrentDTO & Partial<AnimeDTO>>>([])

  const combine = ([animes, trackedAnimes]: [
    QueryObserverResult<AnimeDTO[], unknown>,
    QueryObserverResult<TrackedAnimeTorrentDTO[], unknown>
  ]) => ({
    data: trackedAnimes?.data?.map(trackedAnime => ({
      ...trackedAnime,
      ...animes.data?.find(anime => trackedAnime.malId === anime.malId)
    })),
    isFetched: [animes, trackedAnimes].every(result => result?.isFetched),
    isFetching: [animes, trackedAnimes].some(result => result?.isFetching)
  })

  const { data, isFetched, isFetching } = useQueries({
    queries: [
      { retry: false, queryKey: ["api.anime.getAll"], queryFn: async () => await AnimeServices.getAll() },
      {
        retry: false,
        queryKey: ["api.trackedAnimeTorrent.getAll"],
        queryFn: async () => await TrackedAnimeTorrentService.getAll()
      }
    ],
    combine
  })

  useEffect(() => {
    if (isFetched && data != undefined) {
      setTrackedTorrents(data)
    }
  }, [data, isFetched])

  const updateTrackedAnime = useCallback(
    (updatedTrackedAnime: TrackedAnimeTorrentDTO & Partial<AnimeDTO>) => {
      setTrackedTorrents(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
        )
      )
    },
    [setTrackedTorrents]
  )

  return { trackedTorrents, isFetching, updateTrackedAnime }
}
