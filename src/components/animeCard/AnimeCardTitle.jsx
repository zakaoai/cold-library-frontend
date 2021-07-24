import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

function AnimeCardTitle({ title }) {
  return (
    <Typography style={{ overflow: "hidden", "text-overflow": "ellipsis", maxHeight: 100 }}>{title}</Typography> || (
      <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
    )
  );
}

export default AnimeCardTitle;
