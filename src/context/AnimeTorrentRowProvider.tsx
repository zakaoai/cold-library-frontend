import useAnimeTorrentEpisodes from "@/hooks/containers/TrackedTorrent/useAnimeTorrentEpisodes"
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

    patchTrackedAnimeEpisode,

    deleteTorrent,
    setAnimeEpisodeTorrents,
    isFetching
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
      isFetching,
      showEpisodes,
      setShowEpisodes,
      anime,
      setAnime
    }),
    [
      patchTrackedAnimeEpisode,
      setAnimeEpisodeTorrents,
      selectedEpisodeAlternate,
      showModalAlternateEpisode,
      deleteTorrent,
      animeTorrent,
      animeEpisodeTorrents,
      isFetching,
      showEpisodes,
      anime
    ]
  )

  return <AnimeTorrentRowContext.Provider value={contextValue}>{children}</AnimeTorrentRowContext.Provider>
}

export default AnimeTorrentRowProvider
