import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useTrackedTorrent from "~/hooks/useTrackedTorrent";
import TrackedTorrentRow from "~/components/Torrent/TrackedTorrentRow";

/**
 * Activité
 */
export default function TrackedTorrent() {
  const { trackedTorrents, isFetching, doFetch, updateTrackedAnime, scanAnime } = useTrackedTorrent();

  console.log("TrackedTorrents", trackedTorrents);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Anime</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Dernier Episode regardé</TableCell>
            <TableCell>Mots recherché</TableCell>
            <TableCell>Jour de sortie</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackedTorrents.map(trackedTorrent => (
            <TrackedTorrentRow key={trackedTorrent.malId} trackedTorrent={trackedTorrent} scanAnime={scanAnime} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
