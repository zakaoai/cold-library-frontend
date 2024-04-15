import IconButton from "@mui/material/IconButton"

import StorageState from "@/enums/StorageState"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { blue, red } from "@mui/material/colors"
import { useMemo } from "react"
import type MALCardProps from "./interface/MALCardProps"

const MALInLibraryButton = ({ malAnime }: MALCardProps) => {
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

  return (
    <IconButton style={style} size="large">
      <FavoriteIcon />
    </IconButton>
  )
}

export default MALInLibraryButton
