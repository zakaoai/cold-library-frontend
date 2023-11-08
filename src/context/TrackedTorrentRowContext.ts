import type ITrackedTorrentRowContext from "@/interfaces/contexts/TrackedTorrentRowContext"
import { createContext } from "react"

const TrackedTorrentRowContext = createContext<ITrackedTorrentRowContext | undefined>(undefined)

export default TrackedTorrentRowContext
