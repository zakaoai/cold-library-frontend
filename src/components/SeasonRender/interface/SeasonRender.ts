import type Season from "@/enums/Season"
import type usePagination from "@/hooks/usePagination"
import type { ElementType, ReactNode } from "react"

export default interface SeasonRender<Anime extends { year?: number; season?: Season }> {
  items: Anime[]
  component: ElementType
  renderChild: (anime: Anime[]) => ReactNode
  pagination: ReturnType<typeof usePagination>
}
