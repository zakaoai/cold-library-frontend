import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import useLibrary from "~/hooks/useLibrary";
import StorageState from "~/constants/StorageState";
import { AppBar, Checkbox, IconButton } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { green } from "@material-ui/core/colors";
import HotColdSwitch from "~/components/animeCard/HotColdSwitch";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";

/**
 * Activité
 */
function Library() {
  const [searchValue, setSearchValue] = useState("");

  const { animes, isFetching, doFetch, updateAnime } = useLibrary();

  const [filterStorageState, setFilterStorageState] = useState(StorageState.FLUX_FROID);
  const [filterTrackedAnime, setFilterTrackedAnime] = useState(false);
  const [isFilterTrackedAnimeApplied, setIsFilterTrackedAnimeApplied] = useState(false);

  const onChangeApplyFilterTrackedAnime = () => setIsFilterTrackedAnimeApplied(a => !a);
  const filterTrackedAnimeFunc = isTracked =>
    !isFilterTrackedAnimeApplied || (isFilterTrackedAnimeApplied && isTracked === filterTrackedAnime);

  return (
    <>
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
      <Grid container justify="center" spacing={2}>
        {animes
          .filter(anime => anime.storageState === filterStorageState && filterTrackedAnimeFunc(anime.trackedTorrent))
          .map(anime => (
            <Grid key={anime.malId} item xs={3}>
              <AnimeWrapper anime={anime} updateAnime={updateAnime} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Library;
