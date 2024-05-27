import { type ElementType, type ReactNode } from "react"

export default interface AlphabetRender<Anime extends { title: string }> {
  items: Anime[]
  component: ElementType
  renderChild: (animelist: Anime[]) => ReactNode
}
