import type IAnimeTorrentEpisodeTable from "@/interfaces/containers/Activite/TrackedTorrent/AnimeTorrentEpisodeTable"
import Collapse from "@mui/material/Collapse"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import AnimeEpisodeTorrentRow from "./AnimeEpisodeTorrentRow"

const AnimeTorrentEpisodeTable = ({ torrents, listOpen }: IAnimeTorrentEpisodeTable) => {
  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={7}>
        <Collapse in={listOpen} timeout="auto" unmountOnExit>
          <Table size="small">
            <TableHead sx={{ display: { xs: "none", md: "revert" } }}>
              <TableRow>
                <TableCell>Episode</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Traffic ↓/↑/🗸</TableCell>
                <TableCell>Deluge</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {torrents
                ?.sort((a, b) => a.episodeNumber - b.episodeNumber)
                .map(animeEpisodeTorrent => (
                  <AnimeEpisodeTorrentRow
                    key={`${animeEpisodeTorrent.episodeNumber}-${animeEpisodeTorrent.torrentId}`}
                    animeEpisodeTorrent={animeEpisodeTorrent}
                  />
                ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
export default AnimeTorrentEpisodeTable
