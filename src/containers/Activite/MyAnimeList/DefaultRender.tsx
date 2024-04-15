import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { type ElementType, type ReactNode } from "react"

interface DefaultRenderProps {
  animeList: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>
  component: ElementType
  renderChild: (animelist: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>) => ReactNode
}

const DefaultRender = ({ component: Component, renderChild, animeList }: DefaultRenderProps) => {
  return <Component>{renderChild(animeList)}</Component>
}
export default DefaultRender
