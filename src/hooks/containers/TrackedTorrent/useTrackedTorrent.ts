import useAppContext from "@/hooks/context/useAppContext"
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { type AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef } from "react"

const useTrackedTorrent = () => {
  const { torrentLibrary, setTorrentLibrary, torrentEpisodeLibrary, setTorrentEpisodeLibrary } = useAppContext()

  // Anime Torrents
  const {
    data: animeTorrents,
    isFetched: isAnimeTorrentsFetched,
    isFetching: isAnimeTorrentsFetching
  } = useQuery({
    queryKey: ["torrentLibrary"],
    queryFn: async () => await AnimeTorrentService.getAll(),
    retry: false,
    enabled: torrentLibrary === undefined || torrentLibrary.length === 0
  })
  const prevAnimeTorrents = useRef<AnimeTorrentDTO[]>()
  useEffect(() => {
    if (isAnimeTorrentsFetched && animeTorrents != undefined && animeTorrents != prevAnimeTorrents.current) {
      prevAnimeTorrents.current = animeTorrents
      setTorrentLibrary(animeTorrents)
    }
  }, [animeTorrents, isAnimeTorrentsFetched, setTorrentLibrary])

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
  const prevTorrentEpisodes = useRef<AnimeEpisodeTorrentDTO[]>()
  useEffect(() => {
    if (isTorrentEpisodesFetched && torrentEpisodes != undefined && torrentEpisodes != prevTorrentEpisodes.current) {
      prevTorrentEpisodes.current = torrentEpisodes
      setTorrentEpisodeLibrary(torrentEpisodes)
    }
  }, [isTorrentEpisodesFetched, setTorrentEpisodeLibrary, torrentEpisodes])

  const updateTrackedAnime = useCallback(
    (updatedTrackedAnime: AnimeTorrentDTO) => {
      setTorrentLibrary(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
        )
      )
    },
    [setTorrentLibrary]
  )

  return { isAnimeTorrentsFetching, updateTrackedAnime, isTorrentEpisodesFetching }
}

export default useTrackedTorrent
