import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import { useTrackedTorrentContext } from "@/hooks/context/useTrackedTorrentContext"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditIcon from "@mui/icons-material/Edit"
import FiberNewIcon from "@mui/icons-material/FiberNew"
import SavedSearchIcon from "@mui/icons-material/SavedSearch"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { green } from "@mui/material/colors"
import { useCallback } from "react"

const AnimeTorrentActions = () => {
  const { setEditableTrackedAnime, setShowModal: setShowModalTrackedAnime } = useTrackedTorrentContext()

  const {
    animeTorrent: trackedTorrent,
    searchPack,
    scanEpisodes,
    scanNextEpisode,
    animeEpisodeTorrents
  } = useAnimeTorrentRowContext()
  const { nbEpisodes, lastEpisodeOnServer } = trackedTorrent

  const editTrackedAnime = useCallback(() => {
    setEditableTrackedAnime(trackedTorrent)
    setShowModalTrackedAnime(true)
  }, [setEditableTrackedAnime, setShowModalTrackedAnime, trackedTorrent])

  const isNewEpisode =
    animeEpisodeTorrents.filter(({ episodeNumber }) => episodeNumber > lastEpisodeOnServer).length > 0

  const isComplete = animeEpisodeTorrents.findIndex(({ episodeNumber }) => episodeNumber === nbEpisodes) !== -1

  const isPackInList = animeEpisodeTorrents.findIndex(({ episodeNumber }) => episodeNumber === 0) !== -1

  return (
    <>
      {!isPackInList && (
        <IconButton aria-label="download pack" onClick={searchPack} size="large">
          <CreateNewFolderIcon />
        </IconButton>
      )}
      <IconButton aria-label="edit" onClick={editTrackedAnime} size="large">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="scan all" onClick={scanEpisodes} size="large">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="scan next" onClick={scanNextEpisode} size="large">
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
  )
}

export default AnimeTorrentActions
