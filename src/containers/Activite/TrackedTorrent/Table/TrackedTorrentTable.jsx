import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import TrackedTorrentRow from "./TrackedTorrentRow";

const TrackedTorrentTable = ({ trackedTorrents }) => {
  return (
    <Table>
      <TableHead sx={{ display: { xs: "none", md: "revert" } }}>
        <TableRow>
          <TableCell />
          <TableCell>Anime</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Last ep</TableCell>
          <TableCell>Mots recherché</TableCell>
          <TableCell>Jour de sortie</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trackedTorrents.map(trackedTorrent => (
          <TrackedTorrentRow key={trackedTorrent.malId} trackedTorrent={trackedTorrent} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TrackedTorrentTable;
