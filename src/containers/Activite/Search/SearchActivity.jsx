import React from "react";
import useAnimeSearch from "hooks/useAnimeSearch";
import Grid from "@mui/material/Grid";
import SearchForm from "containers/Activite/Search/SearchForm";
import AnimeWrapper from "components/animeCard/AnimeWrapper";
import { CircularProgress } from "@mui/material";
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
            <Grid item xs={6} md={3} key={anime.malId}>
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
