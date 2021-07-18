import React, { useState } from "react";
import useAnimeSearch from "~/hooks/useAnimeSearch";
import Grid from "@material-ui/core/Grid";
import SearchForm from "~/components/SearchActivity/SearchForm";
import AnimeWrapper from "~/components/animeCard/AnimeWrapper";

/**
 * Activité
 */
function SearchActivity() {
  const [searchValue, setSearchValue] = useState("");
  const { animes, isFetching, setSearch, updateAnime } = useAnimeSearch();

  return (
    <>
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} setSearch={setSearch} />
      <Grid container justify="center" spacing={2}>
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
