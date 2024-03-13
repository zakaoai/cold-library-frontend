import ArrowCollapse from "@/components/ArrowCollapse/ArrowCollapse"
import type AnimeTorrentRow from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentRow"
import { Link } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { NavLink } from "react-router-dom"
import AnimeTorrentActions from "./AnimeTorrentActions"

const AnimeTorrentRowDesktop = ({
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
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th">
        {showedAnimeEpisodeTorrentLength !== 0 && <ArrowCollapse open={showEpisodes} setOpen={setShowEpisodes} />}
      </TableCell>
      <TableCell component="th" scope="row">
        <Link to={`/app/anime/${malId}`} component={NavLink}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>{title}</div>
        </Link>
        {isFetching ? <CircularProgress /> : null}
      </TableCell>
      <TableCell component="th" scope="row">
        {type}
      </TableCell>
      <TableCell component="th" scope="row">
        {lastEpisodeOnServer}
      </TableCell>
      <TableCell component="th" scope="row">
        {searchWords}
      </TableCell>
      <TableCell component="th" scope="row">
        {dayOfRelease}
      </TableCell>
      <TableCell component="th" scope="row">
        <AnimeTorrentActions />
      </TableCell>
    </TableRow>
  )
}

export default AnimeTorrentRowDesktop
