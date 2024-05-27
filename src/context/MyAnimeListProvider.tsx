import { DEFAULT_STATUS } from "@/containers/Activite/MyAnimeList/const"
import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import useUpdateMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useUpdateMyAnimeList"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { useMemo, useState, type PropsWithChildren } from "react"
import MyAnimeListContext from "./MyAnimeListContext"

const MyAnimeListProvider = ({ children }: PropsWithChildren) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(Array<string>(0))

  const [userStatusFilter, setuserStatusFilter] = useState(DEFAULT_STATUS)
  const [myAnimeList, setMyAnimeList] = useState<Array<Omit<MALAnime, "broadcast"> & AnimeDTO>>([])
  const [selectedViewMode, setSelectedViewMode] = useState(ViewMode.DEFAULT)
  const [selectedRenderMode, setSelectedRenderMode] = useState(RenderMode.CARD)
  // const [updateAnimeStateFunction, setUpdateAnimeStateFunction] = useState<(a: AnimeDTO) => void>(() => {})
  const { updateAnime } = useUpdateMyAnimeList(setMyAnimeList)
  const [page, setPage] = useState(1)

  const contextValue = useMemo(
    () => ({
      selectedGenres,
      setSelectedGenres,
      userStatusFilter,
      setuserStatusFilter,
      myAnimeList,
      setMyAnimeList,
      selectedViewMode,
      setSelectedViewMode,
      selectedRenderMode,
      setSelectedRenderMode,
      updateAnimeStateFunction: updateAnime,
      // setUpdateAnimeStateFunction,
      page,
      setPage
    }),
    [
      selectedGenres,
      setSelectedGenres,
      userStatusFilter,
      setuserStatusFilter,
      myAnimeList,
      setMyAnimeList,
      selectedViewMode,
      setSelectedViewMode,
      selectedRenderMode,
      setSelectedRenderMode,
      updateAnime,
      // setUpdateAnimeStateFunction,
      page,
      setPage
    ]
  )

  return <MyAnimeListContext.Provider value={contextValue}>{children}</MyAnimeListContext.Provider>
}

export default MyAnimeListProvider
