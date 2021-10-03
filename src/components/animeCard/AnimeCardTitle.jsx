import React from "react";
import { Skeleton } from "@mui/material";
import { Typography } from "@mui/material";

function AnimeCardTitle({ title }) {
  return (
    <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: 100 }}>{title}</Typography> || (
      <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
    )
  );
}

export default AnimeCardTitle;
