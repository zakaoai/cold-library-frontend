import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { DateTime } from "luxon";

export default function EpisodeLine({ episode }) {
  const { episodeNumber, title, dateSortie } = episode;

  return (
    <TableRow hover key={episodeNumber}>
      <TableCell align="center">{episodeNumber}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">
        {dateSortie && DateTime.fromSeconds(dateSortie).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
    </TableRow>
  );
}
