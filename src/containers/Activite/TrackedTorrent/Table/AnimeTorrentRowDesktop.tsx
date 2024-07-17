import ArrowCollapse from "@/components/ArrowCollapse/ArrowCollapse"

import DayOfWeek from "@/constants/DayOfWeek"
import type AnimeTorrentRow from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentRow"
import CircularProgress from "@mui/material/CircularProgress"
import Link from "@mui/material/Link"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { NavLink } from "react-router"
import AnimeTorrentActions from "./AnimeTorrentActions"

const AnimeTorrentRowDesktop = ({
  showedAnimeEpisodeTorrentLength,
  showEpisodes,
  setShowEpisodes,
  isFetching,
  animeTorrent
}: AnimeTorrentRow) => {
  const { malId, lastEpisodeOnServer, searchWords, dayOfRelease, title } = animeTorrent
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
        {lastEpisodeOnServer}
      </TableCell>
      <TableCell component="th" scope="row">
        {searchWords}
      </TableCell>
      <TableCell component="th" scope="row">
        {DayOfWeek[dayOfRelease]}
      </TableCell>
      <TableCell component="th" scope="row">
        <AnimeTorrentActions />
      </TableCell>
    </TableRow>
  )
}

export default AnimeTorrentRowDesktop
