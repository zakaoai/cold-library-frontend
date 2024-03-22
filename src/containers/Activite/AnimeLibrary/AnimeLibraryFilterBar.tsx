import HotColdSwitch from "@/components/HotColdSwitch/HotColdSwitch"
import ReplayIcon from "@mui/icons-material/Replay"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"

import AnimeCardTrackedButton from "@/components/animeCard/AnimeCardTrackedButton"
import AnimeCompleteButton from "@/components/animeCard/AnimeCompleteButton"
import type IAnimeLibraryFilterBar from "@/interfaces/containers/Activite/AnimeLibrary/AnimeLibraryFilterBar"

const AnimeLibraryFilterBar = ({ filtersState }: IAnimeLibraryFilterBar) => {
  const {
    filterStorageState,
    filterTrackedAnime,
    isFilterTrackedAnimeApplied,
    filterCompletedAnime,
    isFilterCompletedAnimeApplied,
    setFilterStorageState,
    alternateFilterTrackedAnime,
    alternateIsFilterTrackedAnimeApplied,
    alternateFilterCompletedAnime,
    alternateIsFilterCompleteAnimeApplied,
    resetFilters
  } = filtersState
  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <HotColdSwitch storageState={filterStorageState} setStorageState={setFilterStorageState} />
          </Grid>
          <Grid item>
            <Checkbox checked={isFilterTrackedAnimeApplied} onChange={alternateIsFilterTrackedAnimeApplied} />
            <AnimeCardTrackedButton isAnimeTracked={filterTrackedAnime} trackAnime={alternateFilterTrackedAnime} />
          </Grid>
          <Grid item>
            <Checkbox checked={isFilterCompletedAnimeApplied} onChange={alternateIsFilterCompleteAnimeApplied} />
            <AnimeCompleteButton isComplete={filterCompletedAnime} setIsComplete={alternateFilterCompletedAnime} />
          </Grid>
          <Grid item>
            <IconButton onClick={() => resetFilters()} title={"Reset"} size="large">
              <ReplayIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default AnimeLibraryFilterBar
