import { createContext } from "react"
import IAnimeCardContext from "../interface/AnimeCardContext"

const AnimeCardContext = createContext<IAnimeCardContext | undefined>(undefined)

export default AnimeCardContext
