import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import useAnimeSearch from "~/hooks/useAnimeSearch";
import AnimeCard from "~/components/animeCard/AnimeCard";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

/**
 * Activité d'accueil du projet
 */
function Home() {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const [searchValue, setSearchValue] = useState("");

  const classes = useStyles();

  const { animes, isFetching, setSearch } = useAnimeSearch();

  const handleSubmit = event => {
    event.preventDefault();
    setSearch(searchValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Anime à chercher</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton color="primary" aria-label="submit" onClick={() => setSearch(searchValue)} component="span">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
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

export default Home;
