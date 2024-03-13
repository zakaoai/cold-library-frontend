import useAnimeTorrentAction from "@/hooks/containers/TrackedTorrent/useAnimeTorrentAction"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditIcon from "@mui/icons-material/Edit"
import FiberNewIcon from "@mui/icons-material/FiberNew"
import SavedSearchIcon from "@mui/icons-material/SavedSearch"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { green } from "@mui/material/colors"

const AnimeTorrentActions = () => {
  const {
    isNewEpisode,
    isComplete,
    isPackInList,
    searchPack,
    scanEpisodes,
    scanNextEpisode,
    editTrackedAnime,
    isScanEpisodesPending,
    isScanNextEpisodeAvaible,
    isScanNextEpisodePending,
    isSearchPackPending
  } = useAnimeTorrentAction()

  return (
    <>
      {!isPackInList && (
        <IconButton aria-label="download pack" onClick={() => searchPack()} disabled={isSearchPackPending} size="large">
          <CreateNewFolderIcon />
        </IconButton>
      )}
      <IconButton aria-label="edit" onClick={editTrackedAnime} size="large">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="scan all" onClick={() => scanEpisodes()} disabled={isScanEpisodesPending} size="large">
        <SearchIcon />
      </IconButton>
      <IconButton
        aria-label="scan next"
        onClick={() => scanNextEpisode()}
        disabled={isScanNextEpisodeAvaible && isScanNextEpisodePending}
        size="large">
        <SavedSearchIcon />
      </IconButton>
      {isNewEpisode && (
        <Tooltip title="New">
          <FiberNewIcon fontSize="large" style={{ color: green[500] }} />
        </Tooltip>
      )}
      {isComplete && (
        <Tooltip title="Complete">
          <DoneAllIcon fontSize="large" style={{ color: green[500] }} />
        </Tooltip>
      )}
    </>
  )
}

export default AnimeTorrentActions
