import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EpisodeLine from "./EpisodeLine";
import useAnimeEpisode from "hooks/useAnimeEpisode";
import { TablePagination } from "@mui/material";
import usePagination from "hooks/usePagination";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  }
}));

export default function EpisodeTable({ malId }) {
  const classes = useStyles();

  const { animeEpisodes } = useAnimeEpisode(malId);
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination(animeEpisodes);

  console.log("anime length", animeEpisodes.length);
  console.log("rowsPerPage", rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
