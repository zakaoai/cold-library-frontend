import { type UseMutateFunction } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import type AnimeEpisodeTorrentDisplay from "../containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { AnimeDTO } from "../services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface AnimeTorrentRowContext {
  patchTrackedAnimeEpisode: UseMutateFunction<AnimeEpisodeTorrentDTO, Error, AnimeEpisodeTorrentDTO, unknown>
  setAnimeEpisodeTorrents: Dispatch<SetStateAction<AnimeEpisodeTorrentDisplay[]>>
  selectedEpisodeAlternate?: AnimeEpisodeTorrentDisplay
  setSelectedEpisodeAlternate: Dispatch<SetStateAction<AnimeEpisodeTorrentDisplay | undefined>>
  showModalAlternateEpisode: boolean
  setShowModalAlternateEpisode: Dispatch<SetStateAction<boolean>>
  animeTorrent: AnimeTorrentDTO
  animeEpisodeTorrents: AnimeEpisodeTorrentDisplay[]

  isFetching: boolean

  setAnime: Dispatch<SetStateAction<AnimeDTO | undefined>>
  anime?: AnimeDTO
  showEpisodes: boolean
  setShowEpisodes: Dispatch<SetStateAction<boolean>>
}
