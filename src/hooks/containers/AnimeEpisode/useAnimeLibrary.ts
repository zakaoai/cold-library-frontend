import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type TrackedAnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import AnimeServices from "@/services/AnimeService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useQueries, type QueryObserverResult } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

export default function useAnimeLibrary(malId: number) {
  const [anime, setAnime] = useState<AnimeDTO | undefined>(undefined)

  const combine = ([anime, trackedAnime]: [
    QueryObserverResult<AnimeDTO, unknown>,
    QueryObserverResult<TrackedAnimeTorrentDTO, unknown>
  ]) => ({
    data: anime?.data ? { ...anime.data, trackedTorrent: !!trackedAnime.data } : undefined,
    isFetched: [anime, trackedAnime].every(result => result?.isFetched),
    isFetching: [anime, trackedAnime].some(result => result?.isFetching)
  })

  const { data, isFetched, isFetching } = useQueries({
    queries: [
      { retry: false, queryKey: ["api.anime.get", malId], queryFn: async () => await AnimeServices.get(malId) },
      {
        retry: false,
        queryKey: ["api.trackedAnimeTorrent.get", malId],
        queryFn: async () => await AnimeTorrentService.get(malId)
      }
    ],
    combine
  })

  useEffect(() => {
    if (isFetched && data != undefined) {
      setAnime(data)
    }
  }, [data, isFetched])

  const updateAnime = (updatedAnime: AnimeDTO) => {
    setAnime(anime => ({ ...anime, ...updatedAnime }))
  }

  const updateAnimeInfos = useCallback(() => {
    AnimeServices.update(malId).then(updateAnime)
  }, [malId])

  return {
    anime,
    isFetching,
    updateAnime,
    updateAnimeInfos
  }
}
