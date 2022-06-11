import React from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import useAnimeLibrary from "hooks/useAnimeLibrary";
import EpisodeTable from "./EpisodeTable";
import { CircularProgress } from "@mui/material";
import AnimeWrapper from "components/animeCard/AnimeWrapper";
import AnimeEpisodeBar from "./AnimeEpisodeBar";

function AnimeEpisodeActivity() {
  const { malId } = useParams();
  const { anime, isFetching, updateAnime, updateAnimeInfos } = useAnimeLibrary(malId);

  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={12}>
              <AnimeEpisodeBar update={updateAnimeInfos} />
            </Grid>

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
