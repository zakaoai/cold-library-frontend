import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

export default function searchForm({ searchValue, setSearchValue, setSearch }) {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    setSearch(searchValue);
  };

  return (
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
  );
}
