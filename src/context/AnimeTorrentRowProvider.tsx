import useAnimeTorrentEpisodes from "@/hooks/containers/TrackedTorrent/useTrackedTorrentEpisodes"
import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AnimeTorrentRowContext from "./AnimeTorrentRowContext"

const AnimeTorrentRowProvider = ({ children, animeTorrent }: PropsWithChildren & { animeTorrent: AnimeTorrentDTO }) => {
  const [anime, setAnime] = useState<AnimeDTO | undefined>(undefined)

  const { malId, lastEpisodeOnServer } = animeTorrent
  const [showModalAlternateEpisode, setShowModalAlternateEpisode] = useState(false)
  const [selectedEpisodeAlternate, setSelectedEpisodeAlternate] = useState<AnimeEpisodeTorrentDisplay | undefined>(
    undefined
  )
  const [showEpisodes, setShowEpisodes] = useState(false)

  const {
    animeEpisodeTorrents,
    scanEpisodes,
    scanNextEpisode,
    patchTrackedAnimeEpisode,
    searchPack,
    deleteTorrent,
    setAnimeEpisodeTorrents,
    isFetching,
    isScanEpisodesPending,
    isScanNextEpisodeAvaible,
    isScanNextEpisodePending,
    isDownloadDelugeTorrentPending,
    downloadDeluge
  } = useAnimeTorrentEpisodes(malId, lastEpisodeOnServer)

  const contextValue = useMemo(
    () => ({
      patchTrackedAnimeEpisode,
      setAnimeEpisodeTorrents,
      selectedEpisodeAlternate,
      setSelectedEpisodeAlternate,
      showModalAlternateEpisode,
      setShowModalAlternateEpisode,
      deleteTorrent,
      animeTorrent,
      animeEpisodeTorrents,
      searchPack,
      scanEpisodes,
      scanNextEpisode,
      isFetching,
      isScanEpisodesPending,
      isScanNextEpisodeAvaible,
      isScanNextEpisodePending,
      showEpisodes,
      setShowEpisodes,
      anime,
      setAnime,
      isDownloadDelugeTorrentPending,
      downloadDeluge
    }),
    [
      patchTrackedAnimeEpisode,
      setAnimeEpisodeTorrents,
      selectedEpisodeAlternate,
      showModalAlternateEpisode,
      deleteTorrent,
      animeTorrent,
      animeEpisodeTorrents,
      searchPack,
      scanEpisodes,
      scanNextEpisode,
      isFetching,
      isScanEpisodesPending,
      isScanNextEpisodeAvaible,
      isScanNextEpisodePending,
      showEpisodes,
      anime,
      isDownloadDelugeTorrentPending,
      downloadDeluge
    ]
  )

  return <AnimeTorrentRowContext.Provider value={contextValue}>{children}</AnimeTorrentRowContext.Provider>
}

export default AnimeTorrentRowProvider
