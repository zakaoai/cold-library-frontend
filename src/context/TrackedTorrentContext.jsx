import { createContext, useContext } from "react"

const TrackedTorrentContext = createContext(null)

export const TrackedTorrentProvider = ({ children, value }) => {
  return <TrackedTorrentContext.Provider value={value}>{children}</TrackedTorrentContext.Provider>
}

export const useTrackedTorrentContext = () => {
  const context = useContext(TrackedTorrentContext)
  if (context === undefined) {
    throw new Error("useTrackedTorrentContext must be used within a TrackedTorrentProvider")
  }
  return context
}
