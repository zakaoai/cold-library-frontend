import type { Anime } from "@/components/AnimeCardRead/interface/Anime"
import type { JSX } from "react"

export default interface AnimeRowRead {
  anime: Anime
  selectedGenres?: string[]
  beforeTableCell?: JSX.Element
  actionTableCell?: JSX.Element
  imageHeight?: string
}
