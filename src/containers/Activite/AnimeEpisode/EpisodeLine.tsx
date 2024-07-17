import type IEpisodeLine from "@/interfaces/containers/Activite/AnimeEpisode/EpisodeLine"
import { formatJaveLocalDateArray } from "@/utils/dateUtils"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

const EpisodeLine = ({ episode: { episodeNumber, title, date } }: IEpisodeLine) => (
  <TableRow hover key={episodeNumber}>
    <TableCell align="center">{episodeNumber}</TableCell>
    <TableCell align="left">{title}</TableCell>
    <TableCell align="left">
      {date !== undefined && date !== null ? formatJaveLocalDateArray(date) : undefined}
    </TableCell>
  </TableRow>
)

export default EpisodeLine
