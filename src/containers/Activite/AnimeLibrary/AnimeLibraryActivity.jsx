import React from "react";
import Grid from "@material-ui/core/Grid";

import useLibrary from "~/hooks/useLibrary";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";
import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar";
import useAnimeLibraryFilter from "~/hooks/useAnimeLibraryFilter";

/**
 * Activité
 */
function AnimeLibraryActivity() {
  const { animes, isFetching, doFetch, updateAnime } = useLibrary();
  const { filtersState, filterFunc } = useAnimeLibraryFilter();

  return (
    <>
      <AnimeLibraryFilterBar filtersState={filtersState} />

      <Grid container justifyContent="center" spacing={1}>
        {animes.filter(filterFunc).map(anime => (
          <Grid key={anime.malId} item md={3} xs={12} sm={6}>
            <AnimeWrapper anime={anime} showEpisodeLink updateAnime={updateAnime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AnimeLibraryActivity;
