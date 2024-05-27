import HotColdSwitch from "@/components/HotColdSwitch/HotColdSwitch"
import AbcIcon from "@mui/icons-material/Abc"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ReplayIcon from "@mui/icons-material/Replay"
import ViewListIcon from "@mui/icons-material/ViewList"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import { Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Grid from "@mui/material/Unstable_Grid2"

import AnimeCardTrackedButton from "@/components/animeCard/AnimeCardTrackedButton"
import AnimeCompleteButton from "@/components/animeCard/AnimeCompleteButton"
import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import { useAnimeLibrarContext } from "@/hooks/context/useAnimeLibraryContext"
import type IAnimeLibraryFilterBar from "@/interfaces/containers/Activite/AnimeLibrary/AnimeLibraryFilterBar"

import { useCallback, type MouseEvent as ReactMouseEvent } from "react"
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

  const { selectedRenderMode, setSelectedRenderMode, selectedViewMode, setSelectedViewMode } = useAnimeLibrarContext()

  const handleChangeRenderMode = useCallback(
    (_: ReactMouseEvent<HTMLElement>, newRender?: RenderMode) => {
      setSelectedRenderMode(newRender ?? RenderMode.LIST)
    },
    [setSelectedRenderMode]
  )

  const handleChangeViewMode = useCallback(
    (_: ReactMouseEvent<HTMLElement>, newView?: ViewMode) => {
      setSelectedViewMode(newView ?? ViewMode.DEFAULT)
    },
    [setSelectedViewMode]
  )

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} xs={12}>
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
            <Grid container lg={6} xs={12} display="flex" justifyContent={"end"}>
              <Grid>
                <ToggleButtonGroup exclusive onChange={handleChangeViewMode} value={selectedViewMode}>
                  <ToggleButton value={ViewMode.DEFAULT}>Default</ToggleButton>
                  <ToggleButton value={ViewMode.ALPHA}>
                    <AbcIcon />
                  </ToggleButton>
                  <ToggleButton value={ViewMode.SEASON}>
                    <CalendarMonthIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid>
                <ToggleButtonGroup exclusive onChange={handleChangeRenderMode} value={selectedRenderMode}>
                  <ToggleButton value={RenderMode.LIST}>
                    <ViewListIcon />
                  </ToggleButton>
                  <ToggleButton value={RenderMode.CARD}>
                    <ViewModuleIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AnimeLibraryFilterBar
