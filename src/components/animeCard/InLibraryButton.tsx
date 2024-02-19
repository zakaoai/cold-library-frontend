import IconButton from "@mui/material/IconButton"

import FavoriteIcon from "@mui/icons-material/Favorite"
import { red } from "@mui/material/colors"
import { useCallback, useMemo } from "react"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const InLibraryButton = () => {
  const {
    updateAnimeState,
    anime: { storageState }
  } = useAnimeCardContext()
  const isInLibrary = !!storageState
  const { saveAnime, deleteAnime, isSaveInLibraryPending, isDeletePending } = updateAnimeState

  const onClick = useCallback(() => {
    if (isInLibrary && !isDeletePending) {
      deleteAnime()
    } else if (!isSaveInLibraryPending) {
      saveAnime()
    }
  }, [deleteAnime, isDeletePending, isInLibrary, isSaveInLibraryPending, saveAnime])

  const style = useMemo(() => (isInLibrary ? { color: red[500] } : {}), [isInLibrary])

  return (
    <IconButton
      aria-label="add or delete to server"
      title="Ajouter ou Supprimer du Server"
      onClick={onClick}
      style={style}
      size="large">
      <FavoriteIcon />
    </IconButton>
  )
}

export default InLibraryButton
