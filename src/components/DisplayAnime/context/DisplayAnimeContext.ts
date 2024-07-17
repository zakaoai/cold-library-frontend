import { createContext } from "react"
import type IDisplayAnimeContext from "../interface/DisplayAnimeContext"

const DisplayAnimeContext = createContext<IDisplayAnimeContext | undefined>(undefined)

export default DisplayAnimeContext
