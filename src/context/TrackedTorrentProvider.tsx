import useTrackedTorrent from "@/hooks/containers/TrackedTorrent/useTrackedTorrent"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { PropsWithChildren, useMemo, useState } from "react"
import TrackedTorrentContext from "./TrackedTorrentContext"

const TrackedTorrentProvider = ({ children }: PropsWithChildren) => {
  const { updateTrackedAnime } = useTrackedTorrent()
  const [showModal, setShowModal] = useState(false)
  const [doScan, setDoScan] = useState(false)
  const [doScanNext, setDoScanNext] = useState(false)

  const [editableTrackedAnime, setEditableTrackedAnime] = useState<AnimeTorrentDTO | undefined>(undefined)

  const value = useMemo(
    () => ({
      updateTrackedAnime,
      showModal,
      setShowModal,
      doScan,
      setDoScan,
      doScanNext,
      setDoScanNext,
      editableTrackedAnime,
      setEditableTrackedAnime
    }),
    [doScan, doScanNext, editableTrackedAnime, showModal, updateTrackedAnime]
  )

  return <TrackedTorrentContext.Provider value={value}>{children}</TrackedTorrentContext.Provider>
}

export default TrackedTorrentProvider
