import { type ElementType, type ReactNode } from "react"

export default interface AlphabetSection<Anime> {
  letter: string
  items: Anime[]
  component: ElementType
  renderChild: (animelist: Anime[]) => ReactNode
}
