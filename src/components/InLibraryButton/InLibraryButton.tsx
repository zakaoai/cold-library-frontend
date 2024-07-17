import FavoriteIcon from "@mui/icons-material/Favorite"
import IconButton from "@mui/material/IconButton"
import { red } from "@mui/material/colors"
import { useCallback, useMemo } from "react"
import type IInLibraryButton from "./interface/InLibraryButton"

const InLibraryButton = ({ updateAnimeState, anime }: IInLibraryButton) => {
  const { storageState } = anime
  const isInLibrary = !(storageState === undefined || storageState === null)
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
