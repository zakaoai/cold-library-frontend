import Grid from "@mui/material/Grid"

import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
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
              <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default AnimeLibraryActivity
