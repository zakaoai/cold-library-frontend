import type { JSX } from "react"

export default interface AnimeCardReadComponent {
  selectedGenres?: string[]
  actions?: JSX.Element
  avatarColor?: string
}
