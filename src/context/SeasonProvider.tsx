import { AnimeType } from "@/enums/AnimeType"
import Season from "@/enums/Season"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { useMemo, useState, type PropsWithChildren } from "react"
import SeasonContext from "./SeasonContext"

const SeasonProvider = ({ children }: PropsWithChildren) => {
  const currentDate = new Date()
  const seasonList = [Season.WINTER, Season.SPRING, Season.SUMMER, Season.FALL]

  const [seasonSelected, setSeasonSelected] = useState<Season>(seasonList[Math.floor(currentDate.getMonth() / 3)])
  const [yearSelected, setYearSelected] = useState<number>(currentDate.getFullYear())
  const [sortBySelected, setSortBySelected] = useState<keyof MALAnime>("num_list_users")
  const [typeSelected, setTypeSelected] = useState<AnimeType>(AnimeType.ALL)

  const contextValue = useMemo(
    () => ({
      seasonSelected,
      setSeasonSelected,
      yearSelected,
      setYearSelected,
      sortBySelected,
      setSortBySelected,
      typeSelected,
      setTypeSelected
    }),
    [seasonSelected, sortBySelected, typeSelected, yearSelected]
  )

  return <SeasonContext.Provider value={contextValue}>{children}</SeasonContext.Provider>
}

export default SeasonProvider
