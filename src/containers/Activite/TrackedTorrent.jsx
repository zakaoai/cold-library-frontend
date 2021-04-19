import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useTrackedTorrent from "~/hooks/useTrackedTorrent";
import TrackedTorrentRow from "~/components/Torrent/TrackedTorrentRow";
import ModalEditTrackedTorrent from "~/components/Torrent/ModalEditTrackedTorrent";
import TrackedAnimeTorrentService from "~/services/TrackedAnimeTorrentService";
import ModalEditTrackedEpisode from "~/components/Torrent/ModalEditTrackedEpisode";

/**
 * Activité
 */
export default function TrackedTorrent() {
  const { trackedTorrents, isFetching, doFetch, updateTrackedAnime, scanAnime } = useTrackedTorrent();
  const [showModal, setShowModal] = useState(false);
  const [showModalEp, setshowModalEp] = useState(false);
  const [editableTrackedAnime, setEditableTrackedAnime] = useState(undefined);
  const [alternateTrackedEpisode, setAlternateTrackedEpisode] = useState(undefined);

  const handleClose = () => {
    setShowModal(false);
    setEditableTrackedAnime(undefined);
  };

  const handleCloseEp = () => {
    setshowModalEp(false);
    setAlternateTrackedEpisode(undefined);
  };

  const editTrackedAnime = trackedTorrent => {
    setEditableTrackedAnime(trackedTorrent);
    setShowModal(true);
  };

  const searchAlternate = (malId, torrentEpisode) => {
    setshowModalEp(true);
    setAlternateTrackedEpisode(torrentEpisode);
  };

  const patchTrackedAnime = trackedAnime =>
    TrackedAnimeTorrentService.update(trackedAnime.malId, trackedAnime).then(newTrackedAnime =>
      updateTrackedAnime(newTrackedAnime)
    );

  return (
    <>
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
                scanAnime={scanAnime}
                editTrackedAnime={editTrackedAnime}
                searchAlternate={searchAlternate}
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
      {alternateTrackedEpisode && <ModalEditTrackedEpisode handleClose={handleCloseEp} open={showModalEp} />}
    </>
  );
}
