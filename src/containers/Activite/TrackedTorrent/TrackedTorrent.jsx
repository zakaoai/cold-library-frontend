import { TrackedTorrentProvider } from "@/context/TrackedTorrentContext"
import useTrackedTorrent from "@/hooks/containers/TrackedTorrent/useTrackedTorrent"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import { useState } from "react"
import ModalEditTrackedTorrent from "./Modal/ModalEditTrackedTorrent"
import TrackedTorrentTable from "./Table/TrackedTorrentTable"
import TrackedTorrentBar from "./TrackedTorrentBar"

/**
 * Activité
 */
export default function TrackedTorrent() {
  const { trackedTorrents, updateTrackedAnime } = useTrackedTorrent()
  const [showModal, setShowModal] = useState(false)
  const [doScan, setDoScan] = useState(undefined)
  const [doScanNext, setDoScanNext] = useState(undefined)

  const [editableTrackedAnime, setEditableTrackedAnime] = useState(undefined)

  const handleClose = () => {
    setShowModal(false)
    setEditableTrackedAnime(undefined)
  }

  return (
    <TrackedTorrentProvider
      value={{
        updateTrackedAnime,
        doScan,
        setDoScan,
        doScanNext,
        setDoScanNext,
        setEditableTrackedAnime,
        setShowModal
      }}>
      <TrackedTorrentBar />
      <TableContainer component={Paper}>
        <TrackedTorrentTable trackedTorrents={trackedTorrents} />
      </TableContainer>
      {editableTrackedAnime && (
        <ModalEditTrackedTorrent handleClose={handleClose} open={showModal} trackedTorrent={editableTrackedAnime} />
      )}
    </TrackedTorrentProvider>
  )
}
