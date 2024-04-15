import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { ElementType, ReactNode } from "react"

export default interface YearSection {
  year: string
  items: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>
  component: ElementType
  renderChild: (animelist: (Omit<MALAnime, "broadcast"> & AnimeDTO)[]) => ReactNode
}
