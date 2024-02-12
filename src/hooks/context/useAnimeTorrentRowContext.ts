import AnimeTorrentRowContext from "@/context/AnimeTorrentRowContext"
import { useContext } from "react"

export const useAnimeTorrentRowContext = () => {
  const context = useContext(AnimeTorrentRowContext)
  if (context === undefined) {
    throw new Error("useAnimeTorrentRowContext must be used within a AnimeTorrentRowProvider")
  }
  return context
}
