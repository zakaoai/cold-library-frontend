import Grid from "@mui/material/Grid"
import HotColdSwitch from "../HotColdSwitch/HotColdSwitch"
import AnimeCardTrackedButton from "./AnimeCardTrackedButton"
import AnimeCompleteButton from "./AnimeCompleteButton"
import InLibraryButton from "./InLibraryButton"
import LastAvaibleEpisode from "./LastAvaibleEpisode"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeCardBottomActions = () => {
  const { anime, showAddOrRemoveFromLibrary, updateAnimeState } = useAnimeCardContext()

  const { episodes, storageState, isComplete, isDownloading } = anime

  const { setIsComplete, isUpdateIsCompletePending, setStorageState, setIsDownloading } = updateAnimeState
  const isInLibrary = !!storageState

  return (
    <Grid container alignItems="center">
      {showAddOrRemoveFromLibrary && (
        <Grid item xs={2}>
          <InLibraryButton />
        </Grid>
      )}
      {isInLibrary && (
        <>
          <Grid item xs={3}>
            <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
          </Grid>
          <Grid item xs={2}>
            <AnimeCompleteButton
              nbEpisodes={episodes}
              isComplete={isComplete}
              setIsComplete={setIsComplete}
              isCompletePending={isUpdateIsCompletePending}
            />
          </Grid>
          <Grid item xs={3}>
            <LastAvaibleEpisode />
          </Grid>
          <Grid item xs={2}>
            <AnimeCardTrackedButton isAnimeTracked={isDownloading || false} trackAnime={setIsDownloading} />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default AnimeCardBottomActions
