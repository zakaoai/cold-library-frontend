import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { type SelectChangeEvent } from "@mui/material"
import { useCallback, useState, type MouseEvent as ReactMouseEvent } from "react"

const useMyAnimeListFilterBar = () => {
  const {
    selectedGenres,
    setSelectedGenres,
    setuserStatusFilter,
    userStatusFilter,
    myAnimeList,
    selectedRenderMode,
    setSelectedRenderMode,
    selectedViewMode,
    setSelectedViewMode
  } = useMyAnimeListContext()

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
    },
    [setSelectedViewMode]
  )

  const handleClearGenre = useCallback(() => {
    setSelectedGenres([])
    setTempSelectedGenre([])
  }, [setSelectedGenres])

  const handleChangeStatus = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value }
      } = event
      setuserStatusFilter(value)
    },
    [setuserStatusFilter]
  )

  const handleChangeGenre = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const {
        target: { value }
      } = event
      setTempSelectedGenre(typeof value === "string" ? value.split(",") : value)
    },
    [setSelectedGenres]
  )
  const genres = myAnimeList
    .flatMap(({ genres }) => genres)
    .filter((genre, idx, arr) => arr.findIndex(a => a.id === genre.id) === idx)

  const onCloseGenre = () => {
    setSelectedGenres(tempSelectedGenre)
  }

  return {
    selectedGenres: tempSelectedGenre,
    genres,
    handleChangeGenre,
    handleClearGenre,
    handleChangeStatus,
    userStatusFilter,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode,
    handleChangeViewMode,
    selectedViewMode
  }
}

export default useMyAnimeListFilterBar
