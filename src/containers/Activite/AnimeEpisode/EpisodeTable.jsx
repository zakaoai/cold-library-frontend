import useAnimeEpisode from "@/hooks/containers/AnimeEpisode/useAnimeEpisode";
import usePagination from "@/hooks/usePagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import EpisodeLine from "./EpisodeLine";

export default function EpisodeTable({ malId }) {
  const { animeEpisodes } = useAnimeEpisode(malId);
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination(animeEpisodes);

  return (
    <Paper sx={{ width: "100%", marginBottom: "16px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Numéro</TableCell>
              <TableCell align="left">Titre</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animeEpisodes.slice(sliceBegin, sliceEnd).map(episode => (
              <EpisodeLine episode={episode} key={episode.episodeNumber} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={animeEpisodes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={labelTemplate}
      />
    </Paper>
  );
}
