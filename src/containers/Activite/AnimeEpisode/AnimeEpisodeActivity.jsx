import React from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import AnimeCardComponent from "~/components/animeCard/AnimeCardComponent";
import EpisodeTable from "./EpisodeTable";

function AnimeEpisodeActivity() {
  const { malId } = useParams();
  const { anime, isFetching, updateAnimeState, doFetch } = useAnimeLibrary(malId);

  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={3}>
          <AnimeCardComponent
            anime={anime}
            updateAnimeState={updateAnimeState}
            imageHeight={"100%"}
            showAddOrRemoveFromLibrary={false}
          />
        </Grid>
        <Grid item xs={9}>
          <EpisodeTable malId={malId} />
        </Grid>
      </Grid>
    </>
  );
}

export default AnimeEpisodeActivity;
