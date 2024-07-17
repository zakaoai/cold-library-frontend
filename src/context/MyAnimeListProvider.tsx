import { DEFAULT_STATUS } from "@/containers/Activite/MyAnimeList/const"

import type MALAnimeAnimeDTO from "@/interfaces/containers/Activite/MyAnimeList/MALAnimeAnimeDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import MyAnimeListContext from "./MyAnimeListContext"

const MyAnimeListProvider = ({ children }: PropsWithChildren) => {
  const [userStatusFilter, setuserStatusFilter] = useState(DEFAULT_STATUS)
  const [myAnimeList, setMyAnimeList] = useState<MALAnimeAnimeDTO[]>([])

  const contextValue = useMemo(
    () => ({
      userStatusFilter,
      setuserStatusFilter,
      myAnimeList,
      setMyAnimeList
    }),
    [myAnimeList, userStatusFilter]
  )

  return <MyAnimeListContext.Provider value={contextValue}>{children}</MyAnimeListContext.Provider>
}

export default MyAnimeListProvider
