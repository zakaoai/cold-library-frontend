import MyAnimeListContext from "@/context/MyAnimeListContext"
import { useContext } from "react"

export const useMyAnimeListContext = () => {
  const context = useContext(MyAnimeListContext)
  if (context === undefined) {
    throw new Error("useMyAnimeListContext must be used within a MyAnimeListProvider")
  }
  return context
}
