import { createContext } from "react"
import type IAnimeCardContext from "../interface/AnimeCardContext"

const AnimeCardReadContext = createContext<IAnimeCardContext | undefined>(undefined)

export default AnimeCardReadContext
