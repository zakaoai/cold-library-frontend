import type { ChangeEvent } from "react"
import type AnimeEpisodeTorrentDisplay from "../AnimeEpisodeTorrentDisplay"

export default interface AlternateTrackedEpisodeLine {
  trackedEpisode: AnimeEpisodeTorrentDisplay
  selectedValue?: string
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
