import type IAnimeTorrentRowContext from "@/interfaces/contexts/AnimeTorrentRowContext"
import { createContext } from "react"

const AnimeTorrentRowContext = createContext<IAnimeTorrentRowContext | undefined>(undefined)

export default AnimeTorrentRowContext
