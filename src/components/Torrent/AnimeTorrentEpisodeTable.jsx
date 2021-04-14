import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AnimeTorrentEpisodeRow from "./AnimeTorrentEpisodeRow";

export default function AnimeTorrentEpisodeTable({ torrents, listOpen }) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={listOpen} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Episode</TableCell>
                  <TableCell>Titre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {torrents &&
                  torrents.map(animeEpisodeTorrent => (
                    <AnimeTorrentEpisodeRow
                      key={animeEpisodeTorrent.torrentId}
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
