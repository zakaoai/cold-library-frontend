import { DEFAULT_STATUS } from "@/containers/Activite/MyAnimeList/const"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { useMemo } from "react"

const useMyAnimeListFilter = (myAnimeList: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>) => {
  const { selectedGenres, userStatusFilter } = useMyAnimeListContext()

  const filteredMyAnimeList = useMemo(
    () =>
      myAnimeList
        .filter(({ userStatus }) => userStatus === userStatusFilter || userStatusFilter === DEFAULT_STATUS)
        .filter(
          ({ genres }) =>
            selectedGenres.length === 0 ||
            genres.some(genre => selectedGenres.some(selectedGenre => genre.name === selectedGenre))
        ),
    [myAnimeList, selectedGenres, userStatusFilter]
  )

  return { filteredMyAnimeList }
}

export default useMyAnimeListFilter
