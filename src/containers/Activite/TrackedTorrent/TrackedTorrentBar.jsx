import { AppBar, Box, Button, Grid } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const TrackedTorrentBar = ({ scanAll }) => {
  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <Button variant="outlined" onClick={() => scanAll()} startIcon={<SearchIcon />}>
              Scan All
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default TrackedTorrentBar;
