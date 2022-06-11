import { AppBar, Box, Button, Grid } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const AnimeEpisodeBar = ({ update }) => {
  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <Button variant="outlined" onClick={() => update()} startIcon={<SearchIcon />}>
              Update Anime Infos
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default AnimeEpisodeBar;
