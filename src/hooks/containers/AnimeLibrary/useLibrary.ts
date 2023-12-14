import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO"
import AnimeServices from "@/services/AnimeService"
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService"
import { useQueries, type QueryObserverResult } from "@tanstack/react-query"

import { useEffect, useState } from "react"

export default function useLibrary() {
  const [animes, setAnimes] = useState<AnimeDTO[]>([])

  const sortByTitle = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.title.localeCompare(animeB.title)

  const combine = ([animes, trackedAnimes]: [
    QueryObserverResult<AnimeDTO[], unknown>,
    QueryObserverResult<TrackedAnimeTorrentDTO[], unknown>
  ]) => ({
    data: animes?.data
      ?.sort(sortByTitle)
      ?.map(anime =>
        trackedAnimes.data?.some(trackedAnime => trackedAnime.malId === anime.malId)
          ? { ...anime, trackedTorrent: true }
          : { ...anime, trackedTorrent: false }
      ),
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
      setAnimes(data)
    }
  }, [data, isFetched])

  const updateAnime = (updatedAnime: { malId: number }) => {
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  return { animes, isFetching, updateAnime }
}
