import React from "react";
import { Skeleton } from "@material-ui/lab";

function AnimeCardTitle({ title }) {
  return title || <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />;
}

export default AnimeCardTitle;
