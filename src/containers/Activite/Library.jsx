import React, { useState } from "react";
import AnimeLibraryWrapper from "~/components/animeCard/AnimeLibraryWrapper";
import Grid from "@material-ui/core/Grid";

import useLibrary from "~/hooks/useLibrary";
import StorageState from "~/constants/StorageState";
import { AppBar, Toolbar } from "@material-ui/core";
import HotColdSwitch from "~/components/animeCard/HotColdSwitch";

/**
 * Activité
 */
function Library() {
  const [searchValue, setSearchValue] = useState("");

  const { animes, isFetching, doFetch, updateAnime } = useLibrary();

  const [filterStorageState, setFilterStorageState] = useState(StorageState.FLUX_FROID);

  return (
    <>
      <AppBar position="relative" color="transparent">
        <HotColdSwitch storageState={filterStorageState} setStorageState={setFilterStorageState} />
      </AppBar>
      <Grid container justify="center" spacing={2}>
        {animes
          .filter(anime => anime.storageState === filterStorageState)
          .map(anime => (
            <Grid key={anime.malId} item xs={3}>
              <AnimeLibraryWrapper anime={anime} updateAnime={updateAnime} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Library;
