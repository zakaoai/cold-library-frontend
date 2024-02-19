import { Dispatch, SetStateAction } from "react"
import { AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface TrackedTorrentContext {
  updateTrackedAnime: (updatedTrackedAnime: AnimeTorrentDTO) => void
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  doScan: boolean
  setDoScan: Dispatch<SetStateAction<boolean>>
  doScanNext: boolean
  setDoScanNext: Dispatch<SetStateAction<boolean>>
  editableTrackedAnime: AnimeTorrentDTO | undefined
  setEditableTrackedAnime: Dispatch<SetStateAction<AnimeTorrentDTO | undefined>>
}
