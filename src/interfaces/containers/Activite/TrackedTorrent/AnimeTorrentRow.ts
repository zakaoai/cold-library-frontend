import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { Dispatch, SetStateAction } from "react"

export default interface AnimeTorrentRow {
  animeTorrent: AnimeTorrentDTO
  anime?: AnimeDTO
  showedAnimeEpisodeTorrentLength: number
  showEpisodes: boolean
  setShowEpisodes: Dispatch<SetStateAction<boolean>>
  isFetching: boolean
}
