import IconButton from "@mui/material/IconButton"

import StorageState from "@/enums/StorageState"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { blue, red } from "@mui/material/colors"
import { useCallback, useMemo } from "react"
import type MALCardProps from "./interface/MALCardProps"

const MALInLibraryButton = ({ malAnime }: MALCardProps) => {
  const { updateAnimeStateFunction } = useMyAnimeListContext()
  const { storageState } = malAnime

  const style = useMemo(
    () =>
      storageState !== undefined
        ? storageState === StorageState.FLUX_CHAUD
          ? { color: red[500] }
          : { color: blue[200] }
        : {},
    [storageState]
  )
  const updateAnime = useCallback(() => {
    updateAnimeStateFunction(malAnime)
  }, [malAnime])

  return (
    <IconButton style={style} size="large" onClick={updateAnime}>
      <FavoriteIcon />
    </IconButton>
  )
}

export default MALInLibraryButton
