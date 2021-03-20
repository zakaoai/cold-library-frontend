import React from "react";
import AnimeCard from "~/components/animeCard/AnimeCard";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import useAnimeEpisode from "~/hooks/useAnimeEpisode";
import EpisodeTable from "~/components/episode/EpisodeTable";

/**
 * Activité
 */
function AnimeEpisode() {
  const { malId } = useParams();
  const { anime } = useAnimeLibrary(malId);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={3}>
          {anime && <AnimeCard {...anime} />}
        </Grid>
        <Grid item xs={9}>
          <EpisodeTable malId={malId} />
        </Grid>
      </Grid>
    </>
  );
}

export default AnimeEpisode;
