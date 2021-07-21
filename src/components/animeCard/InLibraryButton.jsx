import React from "react";
import { IconButton } from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";

function InLibraryButton({ saveAnime, deleteAnime, isInLibrary }) {
  return (
    <IconButton
      aria-label="add or delete to server"
      title="Ajouter ou Supprimer du Server"
      onClick={() => (isInLibrary && deleteAnime()) || saveAnime()}
      style={(isInLibrary && { color: red[500] }) || {}}>
      <FavoriteIcon />
    </IconButton>
  );
}

export default InLibraryButton;
