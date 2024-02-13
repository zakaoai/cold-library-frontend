import useAnimeLibrary from "@/hooks/containers/AnimeEpisode/useAnimeLibrary"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import AnimeEpisodeParams from "@/interfaces/containers/Activite/AnimeEpisode/AnimeEpisodeParams"
import { useParams } from "react-router-dom"
import AnimeEpisodeBar from "./AnimeEpisodeBar"
import EpisodeTable from "./EpisodeTable"

const AnimeEpisodeActivity = () => {
  const { malId } = useParams<AnimeEpisodeParams>()
  const { anime, isFetching, updateAnime, updateAnimeInfos } = useAnimeLibrary(parseInt(malId as string))

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
              {anime && (
                <AnimeCardProvider anime={anime} updateAnime={updateAnime} imageHeight={"300px"}>
                  <AnimeCardComponent />
                </AnimeCardProvider>
              )}
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
