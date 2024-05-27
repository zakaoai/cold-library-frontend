import Season from "@/enums/Season"
import { type ElementType, type ReactNode } from "react"

export default interface SeasonRender<Anime extends { year?: number; season?: Season }> {
  items: Anime[]
  component: ElementType
  renderChild: (anime: Anime[]) => ReactNode
}
