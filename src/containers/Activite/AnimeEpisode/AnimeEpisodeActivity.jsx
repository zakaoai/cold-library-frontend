import React from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import EpisodeTable from "./EpisodeTable";
import { CircularProgress } from "@material-ui/core";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";

function AnimeEpisodeActivity() {
  const { malId } = useParams();
  const { anime, isFetching, updateAnime } = useAnimeLibrary(malId);

  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={12} md={3}>
              <AnimeWrapper
                anime={anime}
                updateAnime={updateAnime}
                imageHeight={"300px"}
                showAddOrRemoveFromLibrary={false}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <EpisodeTable malId={malId} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default AnimeEpisodeActivity;
