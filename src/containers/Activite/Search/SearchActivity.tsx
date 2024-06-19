import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import SearchForm from "@/containers/Activite/Search/SearchForm"
import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import useAnimeSearch from "@/hooks/containers/Search/useAnimeSearch"
import { Pagination } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

/**
 * Activité
 */
const SearchActivity = () => {
  const { animes, isFetching, error, form, searchAnime, updateAnime, pageMax, currentPage, handleChange } =
    useAnimeSearch()
  const { myOpenedRequestMap, createRequest } = useMyRequest()
  return (
    <>
      <SearchForm searchAnime={searchAnime} form={form} />
      {pageMax !== undefined ? (
        <Pagination
          count={pageMax}
          page={currentPage}
          onChange={handleChange}
          sx={{ justifyContent: "center", display: "flex", paddingY: 2 }}
        />
      ) : undefined}
      <Grid container justifyContent="center" spacing={2}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          animes.map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeCardProvider
                anime={anime}
                showEpisodeLink={!(anime.storageState === null)}
                updateAnime={updateAnime}
                showAddOrRemoveFromLibrary
                request={myOpenedRequestMap[anime.malId]}
                createRequest={createRequest}>
                <AnimeCardComponent />
              </AnimeCardProvider>
            </Grid>
          ))
        )}
        {!isFetching && error !== undefined && <div>{error}</div>}
      </Grid>
    </>
  )
}

export default SearchActivity
