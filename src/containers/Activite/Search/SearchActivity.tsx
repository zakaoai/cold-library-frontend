import AnimeWrapper from "@/components/animeCard/AnimeWrapper";
import SearchForm from "@/containers/Activite/Search/SearchForm";
import useAnimeSearch from "@/hooks/containers/Search/useAnimeSearch";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

/**
 * Activité
 */
function SearchActivity() {
  const { animes, isFetching, error, form, searchAnime, updateAnime } = useAnimeSearch();

  return (
    <>
      <SearchForm searchAnime={searchAnime} form={form} />
      <Grid container justifyContent="center" spacing={2}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          animes.map(anime => (
            <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
              <AnimeWrapper anime={anime} showEpisodeLink={!!anime.storageState} updateAnime={updateAnime} />
            </Grid>
          ))
        )}
        {!isFetching && error && <div>{error}</div>}
      </Grid>
    </>
  );
}

export default SearchActivity;
