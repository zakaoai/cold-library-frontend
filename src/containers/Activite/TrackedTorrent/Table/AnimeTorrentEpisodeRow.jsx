import { useTrackedTorrentContext } from "@/context/TrackedTorrentContext"
import { useTrackedTorrentRowContext } from "@/hooks/context/useTrackedTorrentRowContext"

import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useTheme } from "@emotion/react"
import DeleteIcon from "@mui/icons-material/Delete"
import GetAppIcon from "@mui/icons-material/GetApp"
import InfoIcon from "@mui/icons-material/Info"
import SearchIcon from "@mui/icons-material/Search"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import useMediaQuery from "@mui/material/useMediaQuery"
import { DateTime } from "luxon"
import { useCallback } from "react"

export default function AnimeTorrentEpisodeRow({ animeEpisodeTorrent }) {
  const { episodeNumber, torrentId } = animeEpisodeTorrent

  const { updateTrackedAnime } = useTrackedTorrentContext()

  const { setSelectedEpisodeAlternate, setShowModalAlternateEpisode, deleteTorrent, trackedTorrent } =
    useTrackedTorrentRowContext()

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
    <AnimeTorrentEpisodeRowDesktop
      updateTrackedAnimeEpisode={updateTrackedAnimeEpisode}
      searchAlternate={searchAlternate}
      nyaaLink={nyaaLink}
      deleteTorrent={deleteTorrent}
      {...animeEpisodeTorrent}
    />
  ) : (
    <AnimeTorrentEpisodeRowMobile
      updateTrackedAnimeEpisode={updateTrackedAnimeEpisode}
      searchAlternate={searchAlternate}
      nyaaLink={nyaaLink}
      deleteTorrent={deleteTorrent}
      {...animeEpisodeTorrent}
    />
  )
}

const AnimeTorrentEpisodeRowDesktop = ({
  updateTrackedAnimeEpisode,
  searchAlternate,
  deleteTorrent,
  episodeNumber,
  title,
  date,
  torrentLink,
  torrentId,
  displaySize,
  leechers,
  seeders,
  completed,
  nyaaLink
}) => (
  <TableRow key={torrentId}>
    <TableCell component="th" scope="row">
      <Link component="button" variant="body2" onClick={updateTrackedAnimeEpisode}>
        {episodeNumber}
      </Link>
    </TableCell>
    <TableCell>
      <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
        <Typography>{title}</Typography>
      </div>
    </TableCell>
    <TableCell align="right">{date && DateTime.fromJSDate(date).setLocale("fr").toFormat("dd LLL yyyy")}</TableCell>
    <TableCell component="th" scope="row">
      {displaySize}
    </TableCell>
    <TableCell component="th" scope="row">
      {leechers}/{seeders} ({completed})
    </TableCell>
    <TableCell align="right">
      <IconButton aria-label="search alternate" onClick={searchAlternate} size="large">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="download" href={torrentLink} alt={`Download Torrent ${torrentId}`} size="large">
        <GetAppIcon />
      </IconButton>
      <IconButton aria-label="torrent info" href={nyaaLink} alt={`Infos Torrent ${torrentId}`} size="large">
        <InfoIcon />
      </IconButton>
      <IconButton aria-label="delete torrent episode" onClick={() => deleteTorrent(episodeNumber)} size="large">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
)

const AnimeTorrentEpisodeRowMobile = ({
  updateTrackedAnimeEpisode,
  searchAlternate,
  deleteTorrent,
  episodeNumber,
  title,
  date,
  torrentLink,
  torrentId,
  displaySize,
  leechers,
  seeders,
  completed,
  nyaaLink
}) => (
  <>
    <TableRow key={torrentId + "Episode"}>
      <TableCell component="th" scope="row">
        Episode
      </TableCell>
      <TableCell component="th" scope="row">
        <Link component="button" variant="body2" onClick={updateTrackedAnimeEpisode}>
          {episodeNumber}
        </Link>
      </TableCell>
    </TableRow>
    <TableRow key={torrentId + "Titre"}>
      <TableCell>Titre</TableCell>
      <TableCell>
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>{title.replaceAll("_", " ")}</Typography>
      </TableCell>
    </TableRow>
    <TableRow key={torrentId + "Date"}>
      <TableCell>Date</TableCell>
      <TableCell>{date && DateTime.fromJSDate(date).setLocale("fr").toFormat("dd LLL yyyy")}</TableCell>
    </TableRow>
    <TableRow key={torrentId + "Size"}>
      <TableCell component="th" scope="row">
        Size
      </TableCell>
      <TableCell component="th" scope="row">
        {displaySize}
      </TableCell>
    </TableRow>
    <TableRow key={torrentId + "Traffic"}>
      <TableCell component="th" scope="row">
        Traffic
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers} ↓ /{seeders} ↑ ({completed} 🗸)
      </TableCell>
    </TableRow>
    <TableRow key={torrentId + "Actions"}>
      <TableCell component="th" scope="row">
        Actions
      </TableCell>
      <TableCell>
        <IconButton aria-label="search alternate" onClick={searchAlternate} size="large">
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="download" href={torrentLink} alt={`Download Torrent ${torrentId}`} size="large">
          <GetAppIcon />
        </IconButton>
        <IconButton aria-label="torrent info" href={nyaaLink} alt={`Infos Torrent ${torrentId}`} size="large">
          <InfoIcon />
        </IconButton>
        <IconButton aria-label="delete torrent episode" onClick={() => deleteTorrent(episodeNumber)} size="large">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  </>
)
