import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import type { SelectChangeEvent } from "@mui/material"
import { useCallback, useState, type MouseEvent as ReactMouseEvent } from "react"

const useDisplayAnimeFilterBar = () => {
  const {
    selectedViewMode,
    setSelectedViewMode,
    selectedRenderMode,
    setSelectedRenderMode,
    selectedGenres,
    setSelectedGenres,
    pagination: { handleChangePage }
  } = useDisplayAnimeContext()

  const [tempSelectedGenre, setTempSelectedGenre] = useState(selectedGenres)

  const handleChangeRenderMode = useCallback(
    (_: ReactMouseEvent<HTMLElement>, newRender?: RenderMode) => {
      setSelectedRenderMode(newRender ?? RenderMode.LIST)
    },
    [setSelectedRenderMode]
  )

  const handleChangeViewMode = useCallback(
    (_: ReactMouseEvent<HTMLElement>, newView?: ViewMode) => {
      setSelectedViewMode(newView ?? ViewMode.DEFAULT)
      handleChangePage(null, 0)
    },
    [handleChangePage, setSelectedViewMode]
  )

  const handleClearGenre = useCallback(() => {
    setSelectedGenres([])
    setTempSelectedGenre([])
    handleChangePage(null, 0)
  }, [handleChangePage, setSelectedGenres])

  const handleChangeGenre = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const {
        target: { value }
      } = event
      setTempSelectedGenre(typeof value === "string" ? value.split(",") : value)
    },
    [setTempSelectedGenre]
  )

  const onCloseGenre = useCallback(() => {
    setSelectedGenres(tempSelectedGenre)
    handleChangePage(null, 0)
  }, [handleChangePage, setSelectedGenres, tempSelectedGenre])

  return {
    selectedGenres: tempSelectedGenre,
    handleChangeGenre,
    handleClearGenre,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode,
    handleChangeViewMode,
    selectedViewMode
  }
}

export default useDisplayAnimeFilterBar
