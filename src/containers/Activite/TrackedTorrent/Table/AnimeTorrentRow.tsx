import { useMemo } from "react"

import AnimeTorrentEpisodeTable from "./AnimeEpisodeTorrent/AnimeTorrentEpisodeTable"

import ModalEditTrackedEpisode from "../Modal/AlternateEpisode/ModalEditTrackedEpisode"

import useMediaQuery from "@mui/material/useMediaQuery"

import AnimeTorrentRowProvider from "@/context/AnimeTorrentRowProvider"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import type IAnimeTorrentRowWithContext from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentRowWithContext"
import { useTheme } from "@mui/material/styles"
import AnimeTorrentRowDesktop from "./AnimeTorrentRowDesktop"
import AnimeTorrentRowMobile from "./AnimeTorrentRowMobile"

const AnimeTorrentRow = () => {
  const { animeEpisodeTorrents, animeTorrent, isFetching, showEpisodes, setShowEpisodes } = useAnimeTorrentRowContext()

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
      animeTorrent
    }),
    [animeTorrent, isFetching, setShowEpisodes, showEpisodes, showedTorrents.length]
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
