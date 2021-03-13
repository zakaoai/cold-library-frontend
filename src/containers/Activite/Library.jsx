import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AnimeCard from "~/components/animeCard/AnimeCard";
import Grid from "@material-ui/core/Grid";

import useLibrary from "~/hooks/useLibrary";

/**
 * Activité
 */
function Home() {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const [searchValue, setSearchValue] = useState("");

  const { animes, isFetching, doFetch } = useLibrary();

  const handleSubmit = event => {
    event.preventDefault();
    setSearch(searchValue);
  };

  return (
    <>
      <Grid container justify="center" spacing={2}>
        {animes.map(anime => (
          <Grid item xs={3}>
            <AnimeCard {...anime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
