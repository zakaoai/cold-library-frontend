import Grid from "@mui/material/Grid"

import AnimeWrapper from "@/components/animeCard/AnimeWrapper"
import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar"

/**
 * Activité
 */
function AnimeLibraryActivity() {
  const { animes, updateAnime } = useLibrary()
  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  return (
    <>
      <AnimeLibraryFilterBar filtersState={filtersState} />

      <Grid container justifyContent="center" spacing={1}>
        {animes.filter(filterFunc).map(anime => (
          <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
            <AnimeWrapper anime={anime} showEpisodeLink updateAnime={updateAnime} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AnimeLibraryActivity
