import React from "react";
import useAnimeSearch from "~/hooks/useAnimeSearch";
import Grid from "@material-ui/core/Grid";
import SearchForm from "~/containers/Activite/Search/SearchForm";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";

/**
 * Activité
 */
function SearchActivity() {
  const { animes, setSearch, updateAnime } = useAnimeSearch();

  return (
    <>
      <SearchForm setSearch={setSearch} />
      <Grid container justifyContent="center" spacing={2}>
        {animes.map(anime => (
          <Grid item xs={6} md={3} key={anime.malId}>
            <AnimeWrapper anime={anime} updateAnime={updateAnime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default SearchActivity;
