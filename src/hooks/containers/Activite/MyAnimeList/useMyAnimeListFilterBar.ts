import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALGenre from "@/interfaces/services/UserService/MyAnimeList/MALGenre"
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
    setSelectedViewMode,
    pagination: { handleChangePage }
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
      handleChangePage(null, 0)
    },
    [handleChangePage, setSelectedViewMode]
  )

  const handleClearGenre = useCallback(() => {
    setSelectedGenres([])
    setTempSelectedGenre([])
    handleChangePage(null, 0)
  }, [handleChangePage, setSelectedGenres])

  const handleChangeStatus = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value }
      } = event
      setuserStatusFilter(value)
      handleChangePage(null, 0)
    },
    [handleChangePage, setuserStatusFilter]
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
  const genres: MALGenre[] = myAnimeList
    .flatMap(({ genres }) => genres)
    .filter((a): a is MALGenre => a !== undefined && a !== null)
    .filter((genre, idx, arr) => arr.findIndex(a => a.id === genre.id) === idx)

  const onCloseGenre = useCallback(() => {
    setSelectedGenres(tempSelectedGenre)
    handleChangePage(null, 0)
  }, [handleChangePage, setSelectedGenres, tempSelectedGenre])

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
