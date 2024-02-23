import AnimeTorrentProvider from "@/context/AnimeTorrentProvider"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import ModalEditTrackedTorrent from "./Modal/ModalEditTrackedTorrent"
import AnimeTorrentTable from "./Table/AnimeTorrentTable"
import TrackedTorrentBar from "./TrackedTorrentBar"

/**
 * Activité
 */
const TrackedTorrent = () => (
  <AnimeTorrentProvider>
    <TrackedTorrentBar />
    <TableContainer component={Paper}>
      <AnimeTorrentTable />
    </TableContainer>
    <ModalEditTrackedTorrent />
  </AnimeTorrentProvider>
)
export default TrackedTorrent
