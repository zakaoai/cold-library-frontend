import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import type { AnimeType } from "@/enums/AnimeType"
import Season from "@/enums/Season"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import SeasonService from "@/services/SeasonService"
import type { SelectChangeEvent } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

const useSeasonFilterBar = () => {
  const { setSeasonSelected, setSortBySelected, setTypeSelected, setYearSelected } = useSeasonContext()
  const {
    pagination: { handleChangePage }
  } = useDisplayAnimeContext()
  const { data: seasons } = useQuery({
    staleTime: 3600000,
    queryKey: ["myAnimeList"],
    queryFn: async () => await SeasonService.getSeasonsList(),
    retry: false
  })

  const handleChangeSeason = useCallback(
    (event: SelectChangeEvent<Season>) => {
      const {
        target: { value }
      } = event
      setSeasonSelected(value as Season)
    },
    [setSeasonSelected]
  )

  const handleChangeSortBy = useCallback(
    (event: SelectChangeEvent<keyof MALAnime>) => {
      const {
        target: { value }
      } = event
      setSortBySelected(value as keyof MALAnime)
    },
    [setSortBySelected]
  )

  const handleChangeType = useCallback(
    (event: SelectChangeEvent<AnimeType>) => {
      const {
        target: { value }
      } = event
      setTypeSelected(value as AnimeType)
      handleChangePage(null, 0)
    },
    [handleChangePage, setTypeSelected]
  )

  const handleChangeYear = useCallback(
    (event: SelectChangeEvent<number>) => {
      const {
        target: { value }
      } = event
      setYearSelected(value as number)
      setSeasonSelected(Season.WINTER)
    },
    [setSeasonSelected, setYearSelected]
  )

  return {
    seasons,
    handleChangeSeason,
    handleChangeSortBy,
    handleChangeType,
    handleChangeYear
  }
}

export default useSeasonFilterBar
