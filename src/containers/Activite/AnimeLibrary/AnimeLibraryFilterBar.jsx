import { AppBar, Box, Checkbox, Grid, IconButton } from "@material-ui/core";
import React from "react";
import HotColdSwitch from "~/components/HotColdSwitch/HotColdSwitch";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import { green } from "@material-ui/core/colors";
import AnimeCompleteButton from "~/components/animeCard/AnimeCompleteButton";

const AnimeLibraryFilterBar = ({ filtersState }) => {
  const {
    filterStorageState,
    filterTrackedAnime,
    isFilterTrackedAnimeApplied,
    filterComplete,
    isFilterCompleteApplied,
    setFilterComplete,
    setFilterStorageState,
    setFilterTrackedAnime,
    setIsFilterTrackedAnimeApplied,
    setIsFilterCompleteApplied
  } = filtersState;

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          {/* xs={3} sm={2} md={1} */}
          <Grid item>
            <HotColdSwitch storageState={filterStorageState} setStorageState={setFilterStorageState} />
          </Grid>
          {/* xs={2} sm={4} md={2} */}
          <Grid item>
            <Checkbox checked={isFilterTrackedAnimeApplied} onChange={() => setIsFilterTrackedAnimeApplied(a => !a)} />
            <IconButton
              onClick={() => setFilterTrackedAnime(a => !a)}
              style={(filterTrackedAnime && { color: green[500] }) || {}}>
              <CloudDownloadIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Checkbox checked={isFilterCompleteApplied} onChange={() => setIsFilterCompleteApplied(a => !a)} />
            <AnimeCompleteButton isComplete={filterComplete} setIsComplete={setFilterComplete} />
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default AnimeLibraryFilterBar;
