import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import useLibrary from "~/hooks/useLibrary";
import StorageState from "~/constants/StorageState";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";
import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar";
import { Paper } from "@material-ui/core";

/**
 * Activité
 */
function AnimeLibraryActivity() {
  const { animes, isFetching, doFetch, updateAnime } = useLibrary();

  const [filterStorageState, setFilterStorageState] = useState(StorageState.FLUX_FROID);
  const [filterTrackedAnime, setFilterTrackedAnime] = useState(false);
  const [isFilterTrackedAnimeApplied, setIsFilterTrackedAnimeApplied] = useState(false);

  const onChangeApplyFilterTrackedAnime = () => setIsFilterTrackedAnimeApplied(a => !a);
  const filterTrackedAnimeFunc = isTracked =>
    !isFilterTrackedAnimeApplied || (isFilterTrackedAnimeApplied && isTracked === filterTrackedAnime);

  const storageState = { filterStorageState, setFilterStorageState };
  const trackedAnime = {
    filterTrackedAnime,
    setFilterTrackedAnime,
    isFilterTrackedAnimeApplied,
    onChangeApplyFilterTrackedAnime
  };

  return (
    <>
      <AnimeLibraryFilterBar storageState={storageState} trackedAnime={trackedAnime} />

      <Grid container justify="center" spacing={1}>
        {animes
          .filter(anime => anime.storageState === filterStorageState && filterTrackedAnimeFunc(anime.trackedTorrent))
          .map(anime => (
            <Grid key={anime.malId} item md={3} xs={12} sm={6}>
              <AnimeWrapper anime={anime} updateAnime={updateAnime} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default AnimeLibraryActivity;
