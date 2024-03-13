import useAnimeEpisodeTorrentRow from "@/hooks/containers/TrackedTorrent/useAnimeEpisodeTorrentRow"
import AnimeEpisodeTorrentRow from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentRow"
import DeleteIcon from "@mui/icons-material/Delete"
import GetAppIcon from "@mui/icons-material/GetApp"
import InfoIcon from "@mui/icons-material/Info"
import SearchIcon from "@mui/icons-material/Search"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { DateTime } from "luxon"
import DownloadDelugeTableCell from "./DownloadDelugeTableCell"

const AnimeEpisodeTorrentRowMobile = ({ animeEpisodeTorrent }: AnimeEpisodeTorrentRow) => {
  const { updateTrackedAnimeEpisode, searchAlternate, deleteTorrent, nyaaLink } =
    useAnimeEpisodeTorrentRow(animeEpisodeTorrent)
  const { episodeNumber, title, dateObj, torrentLink, torrentId, displaySize, leechers, seeders, completed } =
    animeEpisodeTorrent

  return (
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
        <TableCell>{dateObj && DateTime.fromJSDate(dateObj).setLocale("fr").toFormat("dd LLL yyyy")}</TableCell>
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
      <TableRow key={torrentId + "Deluge"}>
        <TableCell component="th" scope="row">
          Deluge
        </TableCell>
        <DownloadDelugeTableCell animeEpisodeTorrent={animeEpisodeTorrent} />
      </TableRow>
      <TableRow key={torrentId + "Actions"}>
        <TableCell component="th" scope="row">
          Actions
        </TableCell>
        <TableCell>
          <IconButton aria-label="search alternate" onClick={searchAlternate} size="large">
            <SearchIcon />
          </IconButton>
          <Link href={torrentLink} aria-label="download">
            <IconButton size="large">
              <GetAppIcon />
            </IconButton>
          </Link>
          <Link target="_blank" href={nyaaLink} aria-label="torrent info">
            <IconButton size="large">
              <InfoIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete torrent episode" onClick={() => deleteTorrent()} size="large">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export default AnimeEpisodeTorrentRowMobile
