import React, { useState } from "react";
import useAnimeSearch from "~/hooks/useAnimeSearch";
import AnimeCard from "~/components/animeCard/AnimeCard";
import Grid from "@material-ui/core/Grid";
import SearchForm from "~/components/SearchActivity/SearchForm";

/**
 * Activité
 */
function SearchActivity() {
  const [searchValue, setSearchValue] = useState("");
  const { animes, isFetching, setSearch } = useAnimeSearch();

  return (
    <>
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} setSearch={setSearch} />
      <Grid container justify="center" spacing={2}>
        {animes.map(anime => (
          <Grid item xs={6} md={3}>
            <AnimeCard {...anime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default SearchActivity;
