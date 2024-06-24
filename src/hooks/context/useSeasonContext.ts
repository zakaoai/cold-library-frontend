import SeasonContext from "@/context/SeasonContext"
import { useContext } from "react"

export const useSeasonContext = () => {
  const context = useContext(SeasonContext)
  if (context === undefined) {
    throw new Error("useSeasonContext must be used within a SeasonProvider")
  }
  return context
}
