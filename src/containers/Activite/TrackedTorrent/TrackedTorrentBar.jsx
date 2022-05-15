import { AppBar, Box, Button, Grid } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const TrackedTorrentBar = ({ scanAll }) => {
  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <Button variant="outlined" onClick={() => scanAll()} startIcon={<SearchIcon />}>
              Scan All
            </Button>
            <Button variant="outlined" onClick={() => scanAll()} startIcon={<SearchIcon />}>
              Scan Next
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default TrackedTorrentBar;
