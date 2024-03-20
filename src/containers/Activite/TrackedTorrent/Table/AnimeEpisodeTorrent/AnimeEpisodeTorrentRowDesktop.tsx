import useAnimeEpisodeTorrentRow from "@/hooks/containers/TrackedTorrent/useAnimeEpisodeTorrentRow"
import AnimeEpisodeTorrentRow from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentRow"
import DeleteIcon from "@mui/icons-material/Delete"
import GetAppIcon from "@mui/icons-material/GetApp"
import InfoIcon from "@mui/icons-material/Info"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { DateTime } from "luxon"
import DownloadDelugeTableCell from "./DownloadDelugeTableCell"

const AnimeEpisodeTorrentRowDesktop = ({ animeEpisodeTorrent }: AnimeEpisodeTorrentRow) => {
  const { updateLastEpisodeOnServer, searchAlternate, deleteTorrent, nyaaLink } =
    useAnimeEpisodeTorrentRow(animeEpisodeTorrent)
  const { episodeNumber, title, dateObj, torrentLink, torrentId, displaySize, leechers, seeders, completed } =
    animeEpisodeTorrent

  return (
    <TableRow key={torrentId}>
      <TableCell component="th" scope="row" align="center">
        <Link component="button" variant="body2" onClick={() => updateLastEpisodeOnServer()}>
          {episodeNumber}
        </Link>
      </TableCell>
      <TableCell>
        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
          <Typography>{title}</Typography>
        </div>
      </TableCell>
      <TableCell align="right">
        {dateObj && DateTime.fromJSDate(dateObj).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
      <TableCell component="th" scope="row">
        {displaySize}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <DownloadDelugeTableCell animeEpisodeTorrent={animeEpisodeTorrent} />
      <TableCell align="right">
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
  )
}

export default AnimeEpisodeTorrentRowDesktop
