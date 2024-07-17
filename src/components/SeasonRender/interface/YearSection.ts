import type Season from "@/enums/Season"
import type { ElementType, ReactNode } from "react"

export default interface YearSection<Anime extends { season?: Season }> {
  year: string
  items: Anime[]
  component: ElementType
  renderChild: (anime: Anime[]) => ReactNode
}
