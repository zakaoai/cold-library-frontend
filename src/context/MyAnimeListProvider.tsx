import { DEFAULT_STATUS, RenderMode, ViewMode } from "@/containers/Activite/MyAnimeList/const"
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
  const [updateAnimeStateFunction, setUpdateAnimeStateFunction] = useState<(a: AnimeDTO) => void>((_: AnimeDTO) => {})

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
      updateAnimeStateFunction,
      setUpdateAnimeStateFunction
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
      updateAnimeStateFunction,
      setUpdateAnimeStateFunction
    ]
  )

  return <MyAnimeListContext.Provider value={contextValue}>{children}</MyAnimeListContext.Provider>
}

export default MyAnimeListProvider
