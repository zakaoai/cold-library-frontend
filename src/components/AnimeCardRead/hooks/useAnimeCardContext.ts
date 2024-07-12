import { useContext } from "react"
import AnimeCardReadContext from "../context/AnimeCardReadContext"

export const useAnimeCardReadContext = () => {
  const context = useContext(AnimeCardReadContext)
  if (context === undefined) {
    throw new Error("useAnimeCardReadContext must be used within a AnimeCardReadProvider")
  }
  return context
}
