import AnimeWrapper from "@/components/animeCard/AnimeWrapper";
import SearchForm from "@/containers/Activite/Search/SearchForm";
import useAnimeSearch from "@/hooks/useAnimeSearch";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useLocation } from "react-router-dom";

/**
 * Activité
 */
function SearchActivity() {
  const search = new URLSearchParams(useLocation().search).get("search");
  const { animes, isFetching, error, setSearch, updateAnime } = useAnimeSearch(search);

  return (
    <>
      <SearchForm setSearch={setSearch} defaultSearch={search} />
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
