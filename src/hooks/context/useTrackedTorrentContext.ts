import TrackedTorrentContext from "@/context/TrackedTorrentContext"
import { useContext } from "react"

export const useTrackedTorrentContext = () => {
  const context = useContext(TrackedTorrentContext)
  if (context === undefined) {
    throw new Error("useTrackedTorrentContext must be used within a TrackedTorrentProvider")
  }
  return context
}
