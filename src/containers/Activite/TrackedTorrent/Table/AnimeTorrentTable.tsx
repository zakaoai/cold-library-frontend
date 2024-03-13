import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import useAppContext from "@/hooks/context/useAppContext"
import AnimeTorrentRow from "./AnimeTorrentRow"

const AnimeTorrentTable = () => {
  const { torrentLibrary } = useAppContext()

  return (
    <Table>
      <TableHead sx={{ display: { xs: "none", md: "revert" } }}>
        <TableRow>
          <TableCell />
          <TableCell>Anime</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Last ep</TableCell>
          <TableCell>Mots recherché</TableCell>
          <TableCell>Jour de sortie</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {torrentLibrary
          .sort((a, b) => (a.searchWords > b.searchWords ? 1 : -1))
          .map(animeTorrent => (
            <AnimeTorrentRow key={animeTorrent.malId} animeTorrent={animeTorrent} />
          ))}
      </TableBody>
    </Table>
  )
}

export default AnimeTorrentTable
