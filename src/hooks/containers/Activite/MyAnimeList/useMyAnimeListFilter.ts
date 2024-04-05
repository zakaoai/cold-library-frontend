import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { useMemo, useState } from "react"

const useMyAnimeListFilter = (myAnimeList: (Omit<MALAnime, "broadcast"> & AnimeDTO)[]) => {
  const DEFAULT_STATUS = "ALL"
  const [userStatusFilter, setuserStatusFilter] = useState(DEFAULT_STATUS)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(Array<string>(0))

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

  return { userStatusFilter, setuserStatusFilter, filteredMyAnimeList, selectedGenres, setSelectedGenres }
}

export default useMyAnimeListFilter
