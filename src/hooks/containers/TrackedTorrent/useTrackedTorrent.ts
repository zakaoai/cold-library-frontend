import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

const useTrackedTorrent = () => {
  const { torrentEpisodeLibrary, setTorrentEpisodeLibrary } = useAppContext()

  // Anime Torrents
  const {
    data: animeTorrents = [],
    isFetched: isAnimeTorrentsFetched,
    isFetching: isAnimeTorrentsFetching
  } = useQuery({
    queryKey: ["torrentLibrary"],
    queryFn: async () => await AnimeTorrentService.getAll(),
    retry: false
  })

  // Anime Torrent Episodes
  const {
    data: torrentEpisodes,
    isFetched: isTorrentEpisodesFetched,
    isFetching: isTorrentEpisodesFetching
  } = useQuery({
    queryKey: ["torrentEpisodesLibrary"],
    queryFn: async () => await AnimeEpisodeTorrentService.getAllDownloading(),
    retry: false,
    enabled: torrentEpisodeLibrary === undefined || torrentEpisodeLibrary.length === 0
  })
  const prevTorrentEpisodes = useRef<AnimeEpisodeTorrentDTO[]>(null)
  useEffect(() => {
    if (isTorrentEpisodesFetched && torrentEpisodes !== undefined && torrentEpisodes !== prevTorrentEpisodes.current) {
      prevTorrentEpisodes.current = torrentEpisodes
      setTorrentEpisodeLibrary(torrentEpisodes)
    }
  }, [isTorrentEpisodesFetched, setTorrentEpisodeLibrary, torrentEpisodes])

  return {
    isAnimeTorrentsFetching,
    animeTorrents,
    isAnimeTorrentsFetched,
    isTorrentEpisodesFetching
  }
}

export default useTrackedTorrent
