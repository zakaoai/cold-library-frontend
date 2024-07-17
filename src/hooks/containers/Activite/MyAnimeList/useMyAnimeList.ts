import { useQuery } from "@tanstack/react-query"

import UserAnimeStatus from "@/enums/UserAnimeStatus"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import UserService from "@/services/UserService"
import { useEffect } from "react"
import useMyAnimeListMapper from "./useMyAnimeListMapper"

const useMyAnimeList = () => {
  const { mappedMALAnime } = useMyAnimeListMapper()

  const {
    myAnimeList,
    setMyAnimeList
    // setUpdateAnimeStateFunction
  } = useMyAnimeListContext()

  const { data, isFetched, isFetching } = useQuery({
    staleTime: 3600000,
    queryKey: ["myAnimeList"],
    queryFn: async () => await UserService.animelist(),
    retry: false,
    enabled: myAnimeList === undefined || myAnimeList.length === 0
  })

  const sortMALAnimeList = (a: MALAnime, b: MALAnime) => {
    // Define the order of userStatus values
    const order: Record<UserAnimeStatus, number> = {
      [UserAnimeStatus.WATCHING]: 0,
      [UserAnimeStatus.COMPLETED]: 1,
      [UserAnimeStatus.ON_HOLD]: 2,
      [UserAnimeStatus.DROPPED]: 3,
      [UserAnimeStatus.PLAN_TO_WATCH]: 4
    }

    const sort = order[a.userStatus] - order[b.userStatus]

    if (sort !== 0) {
      return sort
    }

    // Then sort by title
    return a.title.localeCompare(b.title)
  }

  useEffect(() => {
    if (data !== undefined && (myAnimeList === undefined || myAnimeList.length === 0)) {
      setMyAnimeList(data.sort(sortMALAnimeList).map(mappedMALAnime))
    }
  }, [data, isFetched, mappedMALAnime])

  return { myAnimeList, isFetching }
}

export default useMyAnimeList
