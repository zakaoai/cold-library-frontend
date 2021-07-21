import React from "react";

import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

import MoreIcon from "@material-ui/icons/More";

function AnimeCardLink({ malId }) {
  return (
    <IconButton component={Link} to={`/app/anime/${malId}`}>
      <MoreIcon />
    </IconButton>
  );
}

export default AnimeCardLink;
