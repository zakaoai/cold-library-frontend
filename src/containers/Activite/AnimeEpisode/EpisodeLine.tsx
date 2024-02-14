import type IEpisodeLine from "@/interfaces/containers/Activite/AnimeEpisode/EpisodeLine"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { format } from "date-fns/format"

const EpisodeLine = ({ episode }: IEpisodeLine) => {
  const { episodeNumber, title, date } = episode
  const [year, month, day] = date || []

  return (
    <TableRow hover key={episodeNumber}>
      <TableCell align="center">{episodeNumber}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{date && format(new Date(year!, month! - 1, day), "dd/MM/yyyy")}</TableCell>
    </TableRow>
  )
}

export default EpisodeLine
