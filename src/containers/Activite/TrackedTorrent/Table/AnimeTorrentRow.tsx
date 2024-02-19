import { useMemo } from "react"

import AnimeTorrentEpisodeTable from "./AnimeEpisodeTorrent/AnimeTorrentEpisodeTable"

import ModalEditTrackedEpisode from "../Modal/ModalEditTrackedEpisode"

import { useMediaQuery } from "@mui/material"

import AnimeTorrentRowProvider from "@/context/AnimeTorrentRowProvider"
import useAnimeTorrentRow from "@/hooks/containers/TrackedTorrent/useAnimeTorrentRow"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import type IAnimeTorrentRowWithContext from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentRowWithContext"
import { useTheme } from "@mui/material/styles"
import AnimeTorrentRowDesktop from "./AnimeTorrentRowDesktop"
import AnimeTorrentRowMobile from "./AnimeTorrentRowMobile"

const AnimeTorrentRow = () => {
  const { animeEpisodeTorrents, animeTorrent, isFetching, showEpisodes, setShowEpisodes, anime } =
    useAnimeTorrentRowContext()
  useAnimeTorrentRow()
  const { lastEpisodeOnServer } = animeTorrent

  const showedTorrents = useMemo(
    () =>
      animeEpisodeTorrents.filter(({ episodeNumber }) => episodeNumber >= lastEpisodeOnServer || episodeNumber === 0),
    [animeEpisodeTorrents, lastEpisodeOnServer]
  )

  const theme = useTheme()
  const isUpToMd = useMediaQuery(theme.breakpoints.up("md"))

  const animeTorrentRowProps = useMemo(
    () => ({
      showedAnimeEpisodeTorrentLength: showedTorrents.length,
      showEpisodes,
      setShowEpisodes,
      isFetching,
      anime,
      animeTorrent
    }),
    [anime, animeTorrent, isFetching, setShowEpisodes, showEpisodes, showedTorrents.length]
  )

  return (
    <>
      {isUpToMd ? (
        <AnimeTorrentRowDesktop {...animeTorrentRowProps} />
      ) : (
        <AnimeTorrentRowMobile {...animeTorrentRowProps} />
      )}

      {showedTorrents.length !== 0 && <AnimeTorrentEpisodeTable torrents={showedTorrents} listOpen={showEpisodes} />}
      <ModalEditTrackedEpisode />
    </>
  )
}

const AnimeTorrentRowWithContext = ({ animeTorrent }: IAnimeTorrentRowWithContext) => (
  <AnimeTorrentRowProvider animeTorrent={animeTorrent}>
    <AnimeTorrentRow />
  </AnimeTorrentRowProvider>
)

export default AnimeTorrentRowWithContext
