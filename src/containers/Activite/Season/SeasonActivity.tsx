import Grid from "@mui/material/Grid"

import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import SeasonFilterBar from "./SeasonFIlterBar"

/**
 * Activité
 */
const SeasonActivity = () => {
  const { animes, updateAnime } = useLibrary()

  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  // const filterBySeason = ()

  const sortBySeason = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.season.localeCompare(animeB.season)

  return (
    <>
      <SeasonFilterBar filtersState={filtersState} />
      <h1>Winter</h1>
      <Grid container justifyContent="center" spacing={1}>
        {animes
          .sort(sortBySeason)
          .filter(filterFunc)
          .map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))}
      </Grid>
      <h1>Spring</h1>
      <Grid container justifyContent="center" spacing={1}>
        {animes
          .sort(sortBySeason)
          .filter(filterFunc)
          .map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))}
      </Grid>
      <h1>Summer</h1>
      <Grid container justifyContent="center" spacing={1}>
        {animes
          .sort(sortBySeason)
          .filter(filterFunc)
          .map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))}
      </Grid>
      <h1>Autumn</h1>
      <Grid container justifyContent="center" spacing={1}>
        {animes
          .sort(sortBySeason)
          .filter(filterFunc)
          .map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default SeasonActivity
