import AnimeTorrentContext from "@/context/AnimeTorrentContext"
import { useContext } from "react"

export const useAnimeTorrentContext = () => {
  const context = useContext(AnimeTorrentContext)
  if (context === undefined) {
    throw new Error("useTrackedTorrentContext must be used within a TrackedTorrentProvider")
  }
  return context
}
