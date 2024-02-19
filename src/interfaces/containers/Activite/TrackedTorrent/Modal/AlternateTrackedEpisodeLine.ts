import type AnimeEpisodeTorrentDisplay from "../AnimeEpisodeTorrentDisplay"

export default interface AlternateTrackedEpisodeLine {
  trackedEpisode: AnimeEpisodeTorrentDisplay
  selectedValue?: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
