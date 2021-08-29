import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EpisodeLine from "./EpisodeLine";
import useAnimeEpisode from "~/hooks/useAnimeEpisode";
import { TablePagination } from "@material-ui/core";
import usePagination from "~/hooks/usePagination";

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
