import IconButton from "@mui/material/IconButton"

import FavoriteIcon from "@mui/icons-material/Favorite"
import { red } from "@mui/material/colors"

function InLibraryButton({ saveAnime, deleteAnime, isInLibrary }) {
  return (
    <IconButton
      aria-label="add or delete to server"
      title="Ajouter ou Supprimer du Server"
      onClick={() => (isInLibrary && deleteAnime()) || saveAnime()}
      style={(isInLibrary && { color: red[500] }) || {}}
      size="large">
      <FavoriteIcon />
    </IconButton>
  )
}

export default InLibraryButton
