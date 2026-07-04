import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import AnimeTorrentRow from "./AnimeTorrentRow"

const AnimeTorrentTable = () => {
  const { animeTorrents } = useAnimeTorrentContext()

  return (
    <Table>
      <TableHead sx={{ display: { xs: "none", md: "revert" } }}>
        <TableRow>
          <TableCell />
          <TableCell>Anime</TableCell>
          <TableCell>Last ep</TableCell>
          <TableCell>Mots recherché</TableCell>
          <TableCell>Jour de sortie</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {animeTorrents
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(animeTorrent => (
            <AnimeTorrentRow key={animeTorrent.malId} animeTorrent={animeTorrent} />
          ))}
      </TableBody>
    </Table>
  )
}

export default AnimeTorrentTable
