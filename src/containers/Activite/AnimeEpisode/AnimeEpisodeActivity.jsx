import AnimeWrapper from "@/components/animeCard/AnimeWrapper"
import useAnimeLibrary from "@/hooks/containers/AnimeEpisode/useAnimeLibrary"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

import { useParams } from "react-router-dom"
import AnimeEpisodeBar from "./AnimeEpisodeBar"
import EpisodeTable from "./EpisodeTable"

function AnimeEpisodeActivity() {
  const { malId } = useParams()
  const { anime, isFetching, updateAnime, updateAnimeInfos } = useAnimeLibrary(malId)

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
  )
}

export default AnimeEpisodeActivity
