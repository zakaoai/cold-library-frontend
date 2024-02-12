import Grid from "@mui/material/Grid"

import AnimeWrapper from "@/components/animeCard/AnimeWrapper"
import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar"

/**
 * Activité
 */
const AnimeLibraryActivity = () => {
  const { animes, updateAnime } = useLibrary()
  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  const sortByTitle = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.title.localeCompare(animeB.title)

  return (
    <>
      <AnimeLibraryFilterBar filtersState={filtersState} />

      <Grid container justifyContent="center" spacing={1}>
        {animes
          .sort(sortByTitle)
          .filter(filterFunc)
          .map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeWrapper anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary />
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default AnimeLibraryActivity
