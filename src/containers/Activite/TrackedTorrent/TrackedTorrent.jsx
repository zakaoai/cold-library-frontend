import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useTrackedTorrent from "hooks/useTrackedTorrent";
import TrackedTorrentRow from "./Table/TrackedTorrentRow";
import ModalEditTrackedTorrent from "./Modal/ModalEditTrackedTorrent";
import TrackedAnimeTorrentService from "services/TrackedAnimeTorrentService";
import TrackedTorrentBar from "./TrackedTorrentBar";

/**
 * Activité
 */
export default function TrackedTorrent() {
  const { trackedTorrents, updateTrackedAnime } = useTrackedTorrent();
  const [showModal, setShowModal] = useState(false);
  const [doScan, setDoScan] = useState(undefined);

  const [editableTrackedAnime, setEditableTrackedAnime] = useState(undefined);

  const handleClose = () => {
    setShowModal(false);
    setEditableTrackedAnime(undefined);
  };

  const editTrackedAnime = trackedTorrent => {
    setEditableTrackedAnime(trackedTorrent);
    setShowModal(true);
  };

  const patchTrackedAnime = trackedAnime =>
    TrackedAnimeTorrentService.update(trackedAnime.malId, trackedAnime).then(newTrackedAnime =>
      updateTrackedAnime(newTrackedAnime)
    );

  return (
    <>
      <TrackedTorrentBar scanAll={() => setDoScan(a => !a)} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
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
              <TrackedTorrentRow
                key={trackedTorrent.malId}
                trackedTorrent={trackedTorrent}
                editTrackedAnime={editTrackedAnime}
                doScan={doScan}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editableTrackedAnime && (
        <ModalEditTrackedTorrent
          handleClose={handleClose}
          open={showModal}
          trackedTorrent={editableTrackedAnime}
          updateTrackedAnime={patchTrackedAnime}
        />
      )}
    </>
  );
}
