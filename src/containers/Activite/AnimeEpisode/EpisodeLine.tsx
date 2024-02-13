import type IEpisodeLine from "@/interfaces/containers/Activite/AnimeEpisode/EpisodeLine"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

const EpisodeLine = ({ episode }: IEpisodeLine) => {
  const { episodeNumber, title, date } = episode

  return (
    <TableRow hover key={episodeNumber}>
      <TableCell align="center">{episodeNumber}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{date}</TableCell>
    </TableRow>
  )
}

export default EpisodeLine
