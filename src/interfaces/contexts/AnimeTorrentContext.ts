import { Dispatch, SetStateAction } from "react"
import { AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface AnimeTorrentContext {
  updateTrackedAnime: (updatedTrackedAnime: AnimeTorrentDTO) => void
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  doScan: boolean
  setDoScan: Dispatch<SetStateAction<boolean>>
  doScanNext: boolean
  setDoScanNext: Dispatch<SetStateAction<boolean>>
  editableTrackedAnime: AnimeTorrentDTO | undefined
  setEditableTrackedAnime: Dispatch<SetStateAction<AnimeTorrentDTO | undefined>>
  torrentEpisodesMap: Map<number, AnimeEpisodeTorrentDTO[]>
  isTorrentEpisodesFetching: boolean
}
