import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import useDisplayAnimeFilterBar from "@/components/DisplayAnime/hooks/useDisplayAnimeFilterBar"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALGenre from "@/interfaces/services/UserService/MyAnimeList/MALGenre"
import type { SelectChangeEvent } from "@mui/material"
import { useCallback } from "react"

const useMyAnimeListFilterBar = () => {
  const { setuserStatusFilter, userStatusFilter, myAnimeList } = useMyAnimeListContext()

  const {
    selectedGenres,
    handleChangeGenre,
    handleClearGenre,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode,
    handleChangeViewMode,
    selectedViewMode
  } = useDisplayAnimeFilterBar()

  const {
    pagination: { handleChangePage }
  } = useDisplayAnimeContext()

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

  const genres: MALGenre[] = myAnimeList
    .flatMap(({ genres }) => genres)
    .filter((a): a is MALGenre => a !== undefined && a !== null)
    .filter((genre, idx, arr) => arr.findIndex(a => a.id === genre.id) === idx)

  return {
    selectedGenres,
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
