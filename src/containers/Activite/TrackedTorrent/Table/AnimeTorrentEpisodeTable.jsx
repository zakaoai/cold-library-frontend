import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AnimeTorrentEpisodeRow from "./AnimeTorrentEpisodeRow";

export default function AnimeTorrentEpisodeTable({ torrents, listOpen }) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={listOpen} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases">
              <TableHead sx={{ display: { xs: "none", md: "revert" } }}>
                <TableRow>
                  <TableCell>Episode</TableCell>
                  <TableCell>Titre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Traffic ↓/↑/🗸</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {torrents &&
                  torrents
                    .sort((a, b) => a.episodeNumber - b.episodeNumber)
                    .map(animeEpisodeTorrent => (
                      <AnimeTorrentEpisodeRow
                        key={`${animeEpisodeTorrent.episodeNumber}-${animeEpisodeTorrent.torrentId}`}
                        animeEpisodeTorrent={animeEpisodeTorrent}
                      />
                    ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
