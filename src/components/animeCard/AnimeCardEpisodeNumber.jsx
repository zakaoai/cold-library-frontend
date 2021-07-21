import React from "react";
import { Skeleton } from "@material-ui/lab";

function AnimeCardEpisodeNumber({ nbEpisodes }) {
  return (
    (nbEpisodes !== undefined && `Nb Episodes : ${nbEpisodes}`) || (
      <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
    )
  );
}

export default AnimeCardEpisodeNumber;
