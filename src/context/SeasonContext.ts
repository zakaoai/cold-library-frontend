import type ISeasonContext from "@/interfaces/contexts/SeasonContext"
import { createContext } from "react"

const SeasonContext = createContext<ISeasonContext | undefined>(undefined)

export default SeasonContext
