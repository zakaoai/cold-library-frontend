import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AnimeTorrentEpisodeTable from "./AnimeTorrentEpisodeTable";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DayOfWeek from "~/constants/DayOfWeek";
import useTrackedTorrentEpisodes from "~/hooks/useTrackedTorrentEpisodes";
import CircularProgress from "@material-ui/core/CircularProgress";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import { green } from "@material-ui/core/colors";
import ModalEditTrackedEpisode from "../Modal/ModalEditTrackedEpisode";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function TrackedTorrentRow({ trackedTorrent, editTrackedAnime }) {
  const { title, dayOfRelease, lastEpisodeOnServer, searchWords, type, malId } = trackedTorrent;

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEpisodeAlternate, setselectedEpisodeAlternate] = useState(undefined);

  const classes = useRowStyles();

  const { episodes, isFetching, scanEpisodes, patchTrackedAnimeEpisode } = useTrackedTorrentEpisodes(malId);

  const searchAlternateTorrent = torrent => {
    setselectedEpisodeAlternate(torrent);
    setShowModal(true);
  };

  const showedTorrents = episodes.filter(
    ({ episodeNumber }) => episodeNumber >= lastEpisodeOnServer || episodeNumber === 0
  );

  const isNewEpisode = showedTorrents.filter(({ episodeNumber }) => episodeNumber > lastEpisodeOnServer).length > 0;

  const handleCloseEp = () => {
    setShowModal(false);
    setselectedEpisodeAlternate(undefined);
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>{showedTorrents.length !== 0 && <ArrowCollapse open={open} setOpen={setOpen} />}</TableCell>
        <TableCell component="th" scope="row">
          {title} {isFetching ? <CircularProgress /> : null}
        </TableCell>
        <TableCell component="th" scope="row">
          {type}
        </TableCell>
        <TableCell component="th" scope="row">
          {lastEpisodeOnServer}
        </TableCell>
        <TableCell component="th" scope="row">
          {searchWords}
        </TableCell>
        <TableCell component="th" scope="row">
          {DayOfWeek[dayOfRelease]}
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="scan" onClick={() => editTrackedAnime(trackedTorrent)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="scan" onClick={() => scanEpisodes()}>
            <SearchIcon />
          </IconButton>
          {isNewEpisode && <FiberNewIcon fontSize="large" style={{ color: green[500] }} />}
        </TableCell>
      </TableRow>
      {showedTorrents.length !== 0 && (
        <AnimeTorrentEpisodeTable torrents={showedTorrents} listOpen={open} searchAlternate={searchAlternateTorrent} />
      )}
      {selectedEpisodeAlternate && (
        <ModalEditTrackedEpisode
          handleClose={handleCloseEp}
          open={showModal}
          trackedEpisode={selectedEpisodeAlternate}
          updateTrackedEpisode={patchTrackedAnimeEpisode}
        />
      )}
    </>
  );
}

function ArrowCollapse({ open, setOpen }) {
  return (
    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
}
