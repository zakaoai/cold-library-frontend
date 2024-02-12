import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"

import { AnimeEpisodeTorrentDisplay } from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import AnimeTorrentService from "@/services/AnimeTorrentService"

import { useTrackedTorrentContext } from "@/hooks/context/useTrackedTorrentContext"
import { useTheme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useCallback } from "react"
import AnimeEpisodeTorrentRowDesktop from "./AnimeEpisodeTorrentRowDesktop"
import AnimeEpisodeTorrentRowMobile from "./AnimeEpisodeTorrentRowMobile"

const AnimeEpisodeTorrentRow = ({ animeEpisodeTorrent }: { animeEpisodeTorrent: AnimeEpisodeTorrentDisplay }) => {
  const { episodeNumber, torrentId } = animeEpisodeTorrent

  const { updateTrackedAnime } = useTrackedTorrentContext()

  const {
    setSelectedEpisodeAlternate,
    setShowModalAlternateEpisode,
    deleteTorrent,
    animeTorrent: trackedTorrent
  } = useAnimeTorrentRowContext()

  const updateTrackedAnimeEpisode = useCallback(() => {
    AnimeTorrentService.update(trackedTorrent.malId, {
      ...trackedTorrent,
      lastEpisodeOnServer: episodeNumber
    }).then(updatedAnime => updateTrackedAnime(updatedAnime))
  }, [trackedTorrent, episodeNumber, updateTrackedAnime])

  const searchAlternate = useCallback(() => {
    setSelectedEpisodeAlternate(animeEpisodeTorrent)
    setShowModalAlternateEpisode(true)
  }, [setSelectedEpisodeAlternate, setShowModalAlternateEpisode, animeEpisodeTorrent])

  const nyaaLink = `https://nyaa.si/view/${torrentId}`

  const theme = useTheme()
  const isUpToMd = useMediaQuery(theme.breakpoints.up("md"))

  return isUpToMd ? (
    <AnimeEpisodeTorrentRowDesktop
      updateTrackedAnimeEpisode={updateTrackedAnimeEpisode}
      searchAlternate={searchAlternate}
      nyaaLink={nyaaLink}
      deleteTorrent={deleteTorrent}
      animeEpisodeTorrent={animeEpisodeTorrent}
    />
  ) : (
    <AnimeEpisodeTorrentRowMobile
      updateTrackedAnimeEpisode={updateTrackedAnimeEpisode}
      searchAlternate={searchAlternate}
      nyaaLink={nyaaLink}
      deleteTorrent={deleteTorrent}
      animeEpisodeTorrent={animeEpisodeTorrent}
    />
  )
}

export default AnimeEpisodeTorrentRow
