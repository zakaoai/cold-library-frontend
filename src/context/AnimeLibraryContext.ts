import type IAnimeLibraryContext from "@/interfaces/contexts/AnimeLibraryContext"
import { createContext } from "react"

const AnimeLibraryContext = createContext<IAnimeLibraryContext | undefined>(undefined)

export default AnimeLibraryContext
