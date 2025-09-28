import IconButton from "@mui/material/IconButton"

import StorageState from "@/enums/StorageState"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { blue, red } from "@mui/material/colors"
import { useCallback, useMemo } from "react"
import type IInLibraryStateButtonGeneric from "./interface/InLibraryStateButtonGeneric"

const InLibraryStateButtonGeneric = <T extends { storageState?: StorageState }>({
  anime,
  updateAnime
}: IInLibraryStateButtonGeneric<T>) => {
  const { storageState } = anime

  const styleColor = useMemo(
    () => ({
      [StorageState.FLUX_CHAUD]: { color: red[500] },
      [StorageState.FLUX_FROID]: { color: blue[200] },
      default: {}
    }),
    []
  )

  const style = useMemo(
    () => (storageState !== undefined ? styleColor[storageState] : styleColor.default),
    [storageState, styleColor]
  )
  const onClick = useCallback(() => {
    updateAnime(anime)
  }, [anime, updateAnime])

  return (
    <IconButton style={style} size="large" onClick={onClick}>
      <FavoriteIcon />
    </IconButton>
  )
}

export default InLibraryStateButtonGeneric
