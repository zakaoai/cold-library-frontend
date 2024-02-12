import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { DateTime } from "luxon"

const EpisodeLine = ({ episode }) => {
  const { episodeNumber, title, dateSortie } = episode

  return (
    <TableRow hover key={episodeNumber}>
      <TableCell align="center">{episodeNumber}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">
        {dateSortie && DateTime.fromSeconds(dateSortie).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
    </TableRow>
  )
}
