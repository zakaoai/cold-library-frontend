import type { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import type { Dispatch, SetStateAction } from "react"

export default interface AnimeTorrentRow {
  animeTorrent: AnimeTorrentDTO
  showedAnimeEpisodeTorrentLength: number
  showEpisodes: boolean
  setShowEpisodes: Dispatch<SetStateAction<boolean>>
  isFetching: boolean
}
