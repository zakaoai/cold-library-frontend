import type ITrackedTorrentContext from "@/interfaces/contexts/TrackedTorrentContext"
import { createContext } from "react"

const TrackedTorrentContext = createContext<ITrackedTorrentContext | undefined>(undefined)

export default TrackedTorrentContext
