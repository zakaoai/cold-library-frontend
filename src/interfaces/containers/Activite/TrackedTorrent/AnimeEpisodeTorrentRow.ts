import { UseMutateFunction } from "@tanstack/react-query"
import type AnimeEpisodeTorrentDisplay from "./AnimeEpisodeTorrentDisplay"

export default interface AnimeEpisodeTorrentRow {
  updateTrackedAnimeEpisode: () => void
  searchAlternate: () => void
  deleteTorrent: UseMutateFunction<void, Error, number, unknown>
  nyaaLink: string
  animeEpisodeTorrent: AnimeEpisodeTorrentDisplay
}
