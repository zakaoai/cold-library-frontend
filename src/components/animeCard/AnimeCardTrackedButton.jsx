import React from "react";
import { IconButton } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

function AnimeCardTrackedButton({ isAnimeTracked, trackAnime, unTrackAnime }) {
  return (
    <IconButton
      aria-label="Track or UnTrack Anime"
      title="Ajouter ou Supprimer l'anime à la liste des torrents suivie"
      onClick={() => (isAnimeTracked && unTrackAnime()) || trackAnime()}
      style={(isAnimeTracked && { color: green[500] }) || {}}>
      <CloudDownloadIcon />
    </IconButton>
  );
}

export default AnimeCardTrackedButton;
