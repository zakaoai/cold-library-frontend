import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useQuery } from "@tanstack/react-query"

const useTrackedTorrent = () => {
  // Anime Torrents
  const {
    data: animeTorrents = [],
    isFetched: isAnimeTorrentsFetched,
    isFetching: isAnimeTorrentsFetching
  } = useQuery({
    queryKey: ["torrentLibrary"],
    queryFn: () => AnimeTorrentService.getAll(),
    retry: false
  })

  // Anime Torrent Episodes
  const {
    data: torrentEpisodes = [],
    isFetched: isTorrentEpisodesFetched,
    isFetching: isTorrentEpisodesFetching
  } = useQuery({
    queryKey: ["torrentEpisodesLibrary"],
    queryFn: () => AnimeEpisodeTorrentService.getAllDownloading(),
    retry: false
  })

  return {
    animeTorrents,
    isAnimeTorrentsFetching,
    isAnimeTorrentsFetched,
    torrentEpisodes,
    isTorrentEpisodesFetching,
    isTorrentEpisodesFetched
  }
}

export default useTrackedTorrent
