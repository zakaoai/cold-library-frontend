import { type UseMutateFunction } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { type AnimeEpisodeTorrentDisplay } from "../containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { AnimeDTO } from "../services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface AnimeTorrentRowContext {
  patchTrackedAnimeEpisode: UseMutateFunction<AnimeEpisodeTorrentDTO, Error, AnimeEpisodeTorrentDTO, unknown>
  setAnimeEpisodeTorrents: Dispatch<SetStateAction<AnimeEpisodeTorrentDisplay[]>>
  selectedEpisodeAlternate?: AnimeEpisodeTorrentDTO
  setSelectedEpisodeAlternate: Dispatch<SetStateAction<AnimeEpisodeTorrentDTO | undefined>>
  showModalAlternateEpisode: boolean
  setShowModalAlternateEpisode: Dispatch<SetStateAction<boolean>>
  deleteTorrent: UseMutateFunction<void, Error, number, unknown>
  animeTorrent: AnimeTorrentDTO
  animeEpisodeTorrents: AnimeEpisodeTorrentDisplay[]
  searchPack: UseMutateFunction<AnimeEpisodeTorrentDTO, Error, void, unknown>
  scanEpisodes: UseMutateFunction<AnimeEpisodeTorrentDTO[], Error, void, unknown>
  scanNextEpisode: UseMutateFunction<AnimeEpisodeTorrentDTO, unknown, void, unknown>
  isFetching: boolean
  isScanEpisodesPending: boolean
  isScanNextEpisodeAvaible: boolean
  isScanNextEpisodePending: boolean
  setAnime: Dispatch<SetStateAction<AnimeDTO | undefined>>
  anime?: AnimeDTO
  showEpisodes: boolean
  setShowEpisodes: Dispatch<SetStateAction<boolean>>
}
