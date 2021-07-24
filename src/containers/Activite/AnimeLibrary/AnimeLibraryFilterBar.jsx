import { AppBar, Box, Checkbox, Grid, IconButton } from "@material-ui/core";
import React from "react";
import HotColdSwitch from "~/components/HotColdSwitch/HotColdSwitch";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { green } from "@material-ui/core/colors";

const AnimeLibraryFilterBar = ({ storageState, trackedAnime }) => {
  const { filterStorageState, setFilterStorageState } = storageState;
  const { filterTrackedAnime, setFilterTrackedAnime, isFilterTrackedAnimeApplied, onChangeApplyFilterTrackedAnime } =
    trackedAnime;

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container>
          <Grid item xs={2}>
            <HotColdSwitch storageState={filterStorageState} setStorageState={setFilterStorageState} />
          </Grid>
          <Grid item xs={2}>
            <Checkbox checked={isFilterTrackedAnimeApplied} onChange={onChangeApplyFilterTrackedAnime} />
            <IconButton
              onClick={() => setFilterTrackedAnime(a => !a)}
              style={(filterTrackedAnime && { color: green[500] }) || {}}>
              <CloudDownloadIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default AnimeLibraryFilterBar;
