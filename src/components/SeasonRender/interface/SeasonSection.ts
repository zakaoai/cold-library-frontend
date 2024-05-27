import { type ElementType, type ReactNode } from "react"

export default interface SeasonSection<Anime> {
  season: string
  items: Anime[]
  component: ElementType
  renderChild: (animelist: Anime[]) => ReactNode
}
