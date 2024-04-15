import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { ElementType, ReactNode } from "react"

interface DefaultRenderProps {
  animeList: (Omit<MALAnime, "broadcast"> & AnimeDTO)[]
  component: ElementType
  renderChild: (animelist: (Omit<MALAnime, "broadcast"> & AnimeDTO)[]) => ReactNode
}

const DefaultRender = ({ component: Component, renderChild, animeList }: DefaultRenderProps) => {
  return <Component>{renderChild(animeList)}</Component>
}
export default DefaultRender
