import type IAnimeTorrentContext from "@/interfaces/contexts/AnimeTorrentContext"
import { createContext } from "react"

const AnimeTorrentContext = createContext<IAnimeTorrentContext | undefined>(undefined)

export default AnimeTorrentContext
