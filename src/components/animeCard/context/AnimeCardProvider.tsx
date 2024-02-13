import useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import { PropsWithChildren } from "react"
import IAnimeCardProvider from "../interface/AnimeCardProvider"
import AnimeCardContext from "./AnimeCardContext"

const AnimeCardProvider = ({
  children,
  anime,
  updateAnime,
  showEpisodeLink = false,
  imageHeight = "190px",
  showAddOrRemoveFromLibrary = false
}: PropsWithChildren & IAnimeCardProvider) => {
  const defaultAnime = {
    ...anime,
    storageState: undefined,
    isDownloading: undefined,
    isComplete: undefined,
    lastAvaibleEpisode: undefined,
    addedOnServer: undefined
  }

  const updateAnimeState = useUpdateAnimeState(anime.malId, defaultAnime, updateAnime)

  return (
    <AnimeCardContext.Provider
      value={{ anime, updateAnimeState, showEpisodeLink, imageHeight, showAddOrRemoveFromLibrary }}>
      {children}
    </AnimeCardContext.Provider>
  )
}

export default AnimeCardProvider
