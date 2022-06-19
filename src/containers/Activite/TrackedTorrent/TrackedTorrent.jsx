import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTrackedTorrent from "hooks/useTrackedTorrent";
import TrackedTorrentRow from "./Table/TrackedTorrentRow";
import ModalEditTrackedTorrent from "./Modal/ModalEditTrackedTorrent";
import TrackedTorrentBar from "./TrackedTorrentBar";
import { TrackedTorrentProvider } from "context/TrackedTorrentContext";

/**
 * Activité
 */
export default function TrackedTorrent() {
  const { trackedTorrents, updateTrackedAnime } = useTrackedTorrent();
  const [showModal, setShowModal] = useState(false);
  const [doScan, setDoScan] = useState(undefined);
  const [doScanNext, setDoScanNext] = useState(undefined);

  const [editableTrackedAnime, setEditableTrackedAnime] = useState(undefined);

  const handleClose = () => {
    setShowModal(false);
    setEditableTrackedAnime(undefined);
  };

  return (
    <TrackedTorrentProvider
      value={{
        updateTrackedAnime,
        doScan,
        setDoScan,
        doScanNext,
        setDoScanNext,
        setEditableTrackedAnime,
        setShowModal
      }}>
      <TrackedTorrentBar />
      <TableContainer component={Paper}>
        <Table>
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
              <TrackedTorrentRow key={trackedTorrent.malId} trackedTorrent={trackedTorrent} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editableTrackedAnime && (
        <ModalEditTrackedTorrent handleClose={handleClose} open={showModal} trackedTorrent={editableTrackedAnime} />
      )}
    </TrackedTorrentProvider>
  );
}
