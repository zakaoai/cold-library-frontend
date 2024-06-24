import AnimeLibraryContext from "@/context/AnimeLibraryContext"
import { useContext } from "react"

export const useAnimeLibraryContext = () => {
  const context = useContext(AnimeLibraryContext)
  if (context === undefined) {
    throw new Error("useAnimeLibrarContext must be used within a AnimeLibrarProvider")
  }
  return context
}
