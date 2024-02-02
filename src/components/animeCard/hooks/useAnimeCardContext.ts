import { useContext } from "react"
import AnimeCardContext from "../context/AnimeCardContext"

export const useAnimeCardContext = () => {
  const context = useContext(AnimeCardContext)
  if (context === undefined) {
    throw new Error("useAnimeCardContext must be used within a AnimeCardProvider")
  }
  return context
}
