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
import TrackedTorrentTable from "./Table/TrackedTorrentTable";

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
        <TrackedTorrentTable trackedTorrents={trackedTorrents} />
      </TableContainer>
      {editableTrackedAnime && (
        <ModalEditTrackedTorrent handleClose={handleClose} open={showModal} trackedTorrent={editableTrackedAnime} />
      )}
    </TrackedTorrentProvider>
  );
}
