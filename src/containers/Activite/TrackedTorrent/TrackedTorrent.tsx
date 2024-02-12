import TrackedTorrentProvider from "@/context/TrackedTorrentProvider"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import ModalEditTrackedTorrent from "./Modal/ModalEditTrackedTorrent"
import AnimeTorrentTable from "./Table/AnimeTorrentTable"
import TrackedTorrentBar from "./TrackedTorrentBar"

/**
 * Activité
 */
export default function TrackedTorrent() {
  return (
    <TrackedTorrentProvider>
      <TrackedTorrentBar />
      <TableContainer component={Paper}>
        <AnimeTorrentTable />
      </TableContainer>
      <ModalEditTrackedTorrent />
    </TrackedTorrentProvider>
  )
}
