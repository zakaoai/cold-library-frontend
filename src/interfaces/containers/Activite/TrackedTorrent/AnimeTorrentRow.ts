import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { type Dispatch, type SetStateAction } from "react"

export default interface AnimeTorrentRow {
  animeTorrent: AnimeTorrentDTO
  anime?: AnimeDTO
  showedAnimeEpisodeTorrentLength: number
  showEpisodes: boolean
  setShowEpisodes: Dispatch<SetStateAction<boolean>>
  isFetching: boolean
}
