import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import { DEFAULT_STATUS } from "@/containers/Activite/MyAnimeList/const"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALAnimeAnimeDTO from "@/interfaces/containers/Activite/MyAnimeList/MALAnimeAnimeDTO"
import { useCallback, useMemo } from "react"

const useMyAnimeListFilter = (myAnimeList: MALAnimeAnimeDTO[]) => {
  const { userStatusFilter } = useMyAnimeListContext()
  const { selectedGenres } = useDisplayAnimeContext()

  const filterByStatus = useCallback(
    ({ userStatus }: MALAnimeAnimeDTO) => userStatus === userStatusFilter || userStatusFilter === DEFAULT_STATUS,
    [userStatusFilter]
  )

  const filterByGenre = useCallback(
    ({ genres }: MALAnimeAnimeDTO) =>
      selectedGenres.length === 0 || genres?.some(genre => selectedGenres.includes(genre.name)),
    [selectedGenres]
  )

  const filteredMyAnimeList = useMemo(
    () => myAnimeList.filter(filterByStatus).filter(filterByGenre),
    [myAnimeList, filterByStatus, filterByGenre]
  )

  return { filteredMyAnimeList }
}

export default useMyAnimeListFilter
