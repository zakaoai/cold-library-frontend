import ArrowCollapse from "@/components/ArrowCollapse/ArrowCollapse"
import type AnimeTorrentRow from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentRow"
import CircularProgress from "@mui/material/CircularProgress"
import Link from "@mui/material/Link"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { NavLink } from "react-router-dom"
import AnimeTorrentActions from "./AnimeTorrentActions"

const AnimeTorrentRowMobile = ({
  showedAnimeEpisodeTorrentLength,
  showEpisodes,
  setShowEpisodes,
  isFetching,
  anime,
  animeTorrent
}: AnimeTorrentRow) => {
  const { title, type } = anime || {}

  const { malId, lastEpisodeOnServer, searchWords, dayOfRelease } = animeTorrent

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Anime
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/app/anime/${malId}`} component={NavLink}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
          </Link>
          {isFetching ? <CircularProgress /> : null}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Type
        </TableCell>
        <TableCell component="th" scope="row">
          {type}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Last ep
        </TableCell>
        <TableCell component="th" scope="row">
          {lastEpisodeOnServer}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Mots recherché
        </TableCell>
        <TableCell component="th" scope="row">
          {searchWords}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Jour de sortie
        </TableCell>
        <TableCell component="th" scope="row">
          {dayOfRelease}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          Actions
        </TableCell>
        <TableCell component="th" scope="row">
          <AnimeTorrentActions />
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell colSpan={2}>
          {showedAnimeEpisodeTorrentLength !== 0 && <ArrowCollapse open={showEpisodes} setOpen={setShowEpisodes} />}
        </TableCell>
      </TableRow>
    </>
  )
}

export default AnimeTorrentRowMobile
