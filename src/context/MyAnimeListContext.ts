import type IMyAnimeListContext from "@/interfaces/contexts/MyAnimeListContext"
import { createContext } from "react"

const MyAnimeListContext = createContext<IMyAnimeListContext | undefined>(undefined)

export default MyAnimeListContext
