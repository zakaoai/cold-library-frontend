import { createContext } from "react"
import type IAnimeCardContext from "../interface/AnimeCardContext"

const AnimeCardContext = createContext<IAnimeCardContext | undefined>(undefined)

export default AnimeCardContext
