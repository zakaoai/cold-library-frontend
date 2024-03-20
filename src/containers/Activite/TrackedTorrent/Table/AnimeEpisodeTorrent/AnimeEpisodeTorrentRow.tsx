import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"

import useTheme from "@mui/material/styles/useTheme"
import useMediaQuery from "@mui/material/useMediaQuery"
import AnimeEpisodeTorrentRowDesktop from "./AnimeEpisodeTorrentRowDesktop"
import AnimeEpisodeTorrentRowMobile from "./AnimeEpisodeTorrentRowMobile"

const AnimeEpisodeTorrentRow = ({ animeEpisodeTorrent }: { animeEpisodeTorrent: AnimeEpisodeTorrentDisplay }) => {
  const theme = useTheme()
  const isUpToMd = useMediaQuery(theme.breakpoints.up("md"))

  return isUpToMd ? (
    <AnimeEpisodeTorrentRowDesktop animeEpisodeTorrent={animeEpisodeTorrent} />
  ) : (
    <AnimeEpisodeTorrentRowMobile animeEpisodeTorrent={animeEpisodeTorrent} />
  )
}

export default AnimeEpisodeTorrentRow
