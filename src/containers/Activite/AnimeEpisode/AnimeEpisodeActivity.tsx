import AnimeCardReadComponent from "@/components/AnimeCardRead/AnimeCardReadComponent"
import AnimeCardReadEpisodeBottomAction from "@/containers/Activite/AnimeEpisode/AnimeCardReadEpisodeBottomAction"
import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import useAnimeLibrary from "@/hooks/containers/AnimeEpisode/useAnimeLibrary"
import type AnimeEpisodeParams from "@/interfaces/containers/Activite/AnimeEpisode/AnimeEpisodeParams"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import { useParams } from "react-router"
import AnimeEpisodeBar from "./AnimeEpisodeBar"
import EpisodeTable from "./EpisodeTable"

const AnimeEpisodeActivity = () => {
  const { malId } = useParams<AnimeEpisodeParams>()
  const { anime, isFetching, updateAnimeInfos, updateAnime } = useAnimeLibrary(parseInt(malId ?? ""))
  const { myOpenedRequestMap, createRequest } = useMyRequest()

  return (
    <Grid container sx={{ justifyContent: "center" }} spacing={2}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Grid size={{ xs: 12 }}>
            <AnimeEpisodeBar update={updateAnimeInfos} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {anime !== undefined && (
              <AnimeCardReadComponent
                anime={anime}
                actions={
                  <AnimeCardReadEpisodeBottomAction
                    updateAnime={updateAnime}
                    showAddOrRemoveFromLibrary
                    request={myOpenedRequestMap[anime.malId]}
                    createRequest={createRequest}
                    anime={anime}
                  />
                }
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>{malId !== undefined && <EpisodeTable malId={parseInt(malId)} />}</Grid>
        </>
      )}
    </Grid>
  )
}

export default AnimeEpisodeActivity
