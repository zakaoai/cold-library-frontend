import HotColdSwitch from "@/components/HotColdSwitch/HotColdSwitch"
import ReplayIcon from "@mui/icons-material/Replay"
import { Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"

import AnimeCardTrackedButton from "@/components/AnimeCardTrackedButton/AnimeCardTrackedButton"
import AnimeCompleteButton from "@/components/AnimeCompleteButton/AnimeCompleteButton"
import type IAnimeLibraryFilterBar from "@/interfaces/containers/Activite/AnimeLibrary/AnimeLibraryFilterBar"

import useDisplayAnimeFilterBar from "@/components/DisplayAnime/hooks/useDisplayAnimeFilterBar"
import RenderButtons from "@/components/RenderButtons/RenderButtons"
import ViewButtons from "@/components/ViewButtons/ViewButtons"
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

  const { handleChangeRenderMode, selectedRenderMode, handleChangeViewMode, selectedViewMode } =
    useDisplayAnimeFilterBar()

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} size={{ xs: 12 }}>
            <Grid container alignItems="center">
              <Grid>
                <HotColdSwitch storageState={filterStorageState} setStorageState={setFilterStorageState} />
              </Grid>
              <Grid>
                <Checkbox checked={isFilterTrackedAnimeApplied} onChange={alternateIsFilterTrackedAnimeApplied} />
                <AnimeCardTrackedButton isAnimeTracked={filterTrackedAnime} trackAnime={alternateFilterTrackedAnime} />
              </Grid>
              <Checkbox checked={isFilterCompletedAnimeApplied} onChange={alternateIsFilterCompleteAnimeApplied} />
              <AnimeCompleteButton isComplete={filterCompletedAnime} setIsComplete={alternateFilterCompletedAnime} />
              <Grid>
                <IconButton
                  onClick={() => {
                    resetFilters()
                  }}
                  title={"Reset"}
                  size="large">
                  <ReplayIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container size={{ lg: 6, xs: 12 }} display="flex" justifyContent={"end"}>
              <ViewButtons handleChangeViewMode={handleChangeViewMode} selectedViewMode={selectedViewMode} />
              <RenderButtons handleChangeRenderMode={handleChangeRenderMode} selectedRenderMode={selectedRenderMode} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AnimeLibraryFilterBar
