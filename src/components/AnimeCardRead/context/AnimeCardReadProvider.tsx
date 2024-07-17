import { useMemo, type PropsWithChildren } from "react"
import type IAnimeCardProvider from "../interface/AnimeCardProvider"
import AnimeCardReadContext from "./AnimeCardReadContext"

const AnimeCardReadProvider = ({
  children,
  anime,
  showEpisodeLink = false,
  imageHeight = "190px"
}: PropsWithChildren & IAnimeCardProvider) => {
  const value = useMemo(
    () => ({
      anime,
      showEpisodeLink,
      imageHeight
    }),
    [anime, imageHeight, showEpisodeLink]
  )

  return <AnimeCardReadContext.Provider value={value}>{children}</AnimeCardReadContext.Provider>
}

export default AnimeCardReadProvider
