import type usePagination from "@/hooks/usePagination"
import type { ElementType, ReactNode } from "react"

export default interface AlphabetRender<Anime extends { title: string }> {
  items: Anime[]
  component: ElementType
  renderChild: (animelist: Anime[]) => ReactNode
  pagination: ReturnType<typeof usePagination>
}
