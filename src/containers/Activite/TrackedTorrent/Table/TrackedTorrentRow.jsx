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
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Tooltip from "@material-ui/core/Tooltip";
import { NavLink } from "react-router-dom";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
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
            <IconButton aria-label="download pack" onClick={() => searchPack()}>
              <CreateNewFolderIcon />
            </IconButton>
          )}
          <IconButton aria-label="scan" onClick={() => editTrackedAnime(trackedTorrent)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="scan" onClick={() => scanEpisodes()}>
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
