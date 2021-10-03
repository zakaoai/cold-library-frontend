import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AnimeTorrentEpisodeTable from "./AnimeTorrentEpisodeTable";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DayOfWeek from "constants/DayOfWeek";
import useTrackedTorrentEpisodes from "hooks/useTrackedTorrentEpisodes";
import CircularProgress from "@mui/material/CircularProgress";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { green } from "@mui/material/colors";
import ModalEditTrackedEpisode from "../Modal/ModalEditTrackedEpisode";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useEffect } from "react";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function TrackedTorrentRow({ trackedTorrent, editTrackedAnime, doScan }) {
  const { title, dayOfRelease, lastEpisodeOnServer, searchWords, type, malId, nbEpisodes } = trackedTorrent;

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEpisodeAlternate, setselectedEpisodeAlternate] = useState(undefined);

  const classes = useRowStyles();

  const { episodes, isFetching, scanEpisodes, patchTrackedAnimeEpisode, searchPack } = useTrackedTorrentEpisodes(malId);

  useEffect(() => {
    if (doScan != undefined) {
      scanEpisodes();
    }
  }, [doScan]);

  const searchAlternateTorrent = torrent => {
    setselectedEpisodeAlternate(torrent);
    setShowModal(true);
  };

  const showedTorrents = episodes.filter(
    ({ episodeNumber }) => episodeNumber >= lastEpisodeOnServer || episodeNumber === 0
  );

  const isNewEpisode = showedTorrents.filter(({ episodeNumber }) => episodeNumber > lastEpisodeOnServer).length > 0;

  const isComplete = showedTorrents.findIndex(({ episodeNumber }) => episodeNumber === nbEpisodes) === -1;

  const isPackInList = showedTorrents.findIndex(({ episodeNumber }) => episodeNumber === 0) !== -1;

  const handleCloseEp = () => {
    setShowModal(false);
    setselectedEpisodeAlternate(undefined);
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>{showedTorrents.length !== 0 && <ArrowCollapse open={open} setOpen={setOpen} />}</TableCell>
        <TableCell component="th" scope="row">
          <NavLink to={`/app/anime/${malId}`}>{title}</NavLink> {isFetching ? <CircularProgress /> : null}
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
          {!isPackInList && (
            <IconButton aria-label="download pack" onClick={() => searchPack()} size="large">
              <CreateNewFolderIcon />
            </IconButton>
          )}
          <IconButton aria-label="scan" onClick={() => editTrackedAnime(trackedTorrent)} size="large">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="scan" onClick={() => scanEpisodes()} size="large">
            <SearchIcon />
          </IconButton>
          {isNewEpisode && (
            <Tooltip title="New">
              <FiberNewIcon fontSize="large" style={{ color: green[500] }} />
            </Tooltip>
          )}
          {isComplete && (
            <Tooltip title="Complete">
              <DoneAllIcon alt="Complete" fontSize="large" style={{ color: green[500] }} />
            </Tooltip>
          )}
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
