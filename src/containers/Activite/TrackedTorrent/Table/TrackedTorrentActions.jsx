import IconButton from "@mui/material/IconButton";
import React, { useCallback } from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Tooltip from "@mui/material/Tooltip";
import { green } from "@mui/material/colors";
import { useTrackedTorrentContext } from "context/TrackedTorrentContext";
import { useTrackedTorrentRowContext } from "context/TrackedTorrentRowContext";

const TrackedTorrentActions = () => {
  const { setEditableTrackedAnime, setShowModal: setShowModalTrackedAnime } = useTrackedTorrentContext();

  const { trackedTorrent, showedTorrents, searchPack, scanEpisodes, scanNextEpisode } = useTrackedTorrentRowContext();
  const { nbEpisodes, lastEpisodeOnServer } = trackedTorrent;

  const editTrackedAnime = useCallback(
    trackedTorrent => {
      setEditableTrackedAnime(trackedTorrent);
      setShowModalTrackedAnime(true);
    },
    [setEditableTrackedAnime, setShowModalTrackedAnime]
  );

  const isNewEpisode = showedTorrents.filter(({ episodeNumber }) => episodeNumber > lastEpisodeOnServer).length > 0;

  const isComplete = showedTorrents.findIndex(({ episodeNumber }) => episodeNumber === nbEpisodes) !== -1;

  const isPackInList = showedTorrents.findIndex(({ episodeNumber }) => episodeNumber === 0) !== -1;

  return (
    <>
      {!isPackInList && (
        <IconButton aria-label="download pack" onClick={() => searchPack()} size="large">
          <CreateNewFolderIcon />
        </IconButton>
      )}
      <IconButton aria-label="scan" onClick={() => editTrackedAnime(trackedTorrent)} size="large">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="scan all" onClick={() => scanEpisodes()} size="large">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="scan next" onClick={() => scanNextEpisode()} size="large">
        <SavedSearchIcon />
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
    </>
  );
};

export default TrackedTorrentActions;