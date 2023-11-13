import Grid from "@mui/material/Grid"
import HotColdSwitch from "../HotColdSwitch/HotColdSwitch"
import AnimeCardTrackedButton from "./AnimeCardTrackedButton"
import AnimeCompleteButton from "./AnimeCompleteButton"
import InLibraryButton from "./InLibraryButton"
import LastAvaibleEpisode from "./LastAvaibleEpisode"

const AnimeCardBottomActions = ({ showAddOrRemoveFromLibrary, anime, updateAnimeState }) => {
  const { nbEpisodes, storageState, isComplete, lastAvaibleEpisode, trackedTorrent } = anime || {}
  const { deleteAnime, saveAnime, setIsComplete, setStorageState, setLastAvaibleEpisode, trackAnime } = updateAnimeState
  const isInLibrary = !!storageState

  return (
    <Grid container alignItems="center">
      {showAddOrRemoveFromLibrary && (
        <Grid item xs={2}>
          <InLibraryButton saveAnime={saveAnime} deleteAnime={deleteAnime} isInLibrary={isInLibrary} />
        </Grid>
      )}
      {isInLibrary && (
        <>
          <Grid item xs={3}>
            <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
          </Grid>
          <Grid item xs={2}>
            <AnimeCompleteButton nbEpisodes={nbEpisodes} isComplete={isComplete} setIsComplete={setIsComplete} />
          </Grid>
          <Grid item xs={3}>
            <LastAvaibleEpisode lastAvaibleEpisode={lastAvaibleEpisode} setLastAvaibleEpisode={setLastAvaibleEpisode} />
          </Grid>
          <Grid item xs={2}>
            <AnimeCardTrackedButton isAnimeTracked={trackedTorrent} trackAnime={trackAnime} />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default AnimeCardBottomActions
