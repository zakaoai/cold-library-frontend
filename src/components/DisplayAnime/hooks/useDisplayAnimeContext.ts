import { useContext } from "react"
import DisplayAnimeContext from "../context/DisplayAnimeContext"

export const useDisplayAnimeContext = () => {
  const context = useContext(DisplayAnimeContext)
  if (context === undefined) {
    throw new Error("useDisplayAnimeContext must be used within a DisplayAnimeProvider")
  }
  return context
}
