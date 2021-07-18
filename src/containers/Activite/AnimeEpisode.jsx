import React from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import EpisodeTable from "~/components/episode/EpisodeTable";
import AnimeCardComponent from "~/components/animeCard/AnimeCardComponent";

/**
 * Activité
 */
function AnimeEpisode() {
  const { malId } = useParams();
  const { anime, isFetching, updateAnimeState, doFetch } = useAnimeLibrary(malId);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={3}>
          <AnimeCardComponent anime={anime} updateAnimeState={updateAnimeState} />
        </Grid>
        <Grid item xs={9}>
          <EpisodeTable malId={malId} />
        </Grid>
      </Grid>
    </>
  );
}

export default AnimeEpisode;
