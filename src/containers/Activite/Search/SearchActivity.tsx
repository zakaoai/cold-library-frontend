import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import SearchForm from "@/containers/Activite/Search/SearchForm"
import useAnimeSearch from "@/hooks/containers/Search/useAnimeSearch"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

/**
 * Activité
 */
const SearchActivity = () => {
  const { animes, isFetching, error, form, searchAnime, updateAnime } = useAnimeSearch()

  return (
    <>
      <SearchForm searchAnime={searchAnime} form={form} />
      <Grid container justifyContent="center" spacing={2}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          animes.map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider
                anime={anime}
                showEpisodeLink={!(anime.storageState == null)}
                updateAnime={updateAnime}
                showAddOrRemoveFromLibrary>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))
        )}
        {!isFetching && error && <div>{error}</div>}
      </Grid>
    </>
  )
}

export default SearchActivity
