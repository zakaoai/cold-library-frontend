import { type PropsWithChildren } from "react"
import type IAnimeCardProvider from "../interface/AnimeCardProvider"
import AnimeCardReadContext from "./AnimeCardReadContext"

const AnimeCardReadProvider = ({
  children,
  anime,
  showEpisodeLink = false,
  imageHeight = "190px"
}: PropsWithChildren & IAnimeCardProvider) => {
  return (
    <AnimeCardReadContext.Provider
      value={{
        anime,
        showEpisodeLink,
        imageHeight
      }}>
      {children}
    </AnimeCardReadContext.Provider>
  )
}

export default AnimeCardReadProvider
