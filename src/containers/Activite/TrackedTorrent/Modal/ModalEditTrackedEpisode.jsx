import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { makeStyles, TablePagination } from "@material-ui/core";
import usePagination from "~/hooks/usePagination";
import useSortTable from "~/hooks/useSortTable";
import FilterHeaderCell from "~/components/FilterHeaderCell/FilterHeaderCell";
import useAlternateTrackedTorrentEpisode from "~/hooks/useAlternateTrackedTorrentEpisode";
import AlternateTrackedEpisodeLine from "./AlternateTrackedEpisodeLine";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  }
}));

export default function ModalEditTrackedEpisode({ trackedEpisode = {}, open, handleClose, updateTrackedEpisode }) {
  const { episodeNumber } = trackedEpisode;
  const { handleChange, handleModifier, alternateTrackedEpisodes, selectedValue } = useAlternateTrackedTorrentEpisode(
    trackedEpisode,
    updateTrackedEpisode,
    handleClose
  );

  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination(alternateTrackedEpisodes);

  const sortObj = useSortTable();
  const { sortFunction } = sortObj;

  const headCells = [
    { id: "empty", filter: false },
    { id: "title", filter: true, label: "Titre" },
    { id: "date", filter: true, label: "Date" },
    { id: "byteSize", filter: true, label: "Size" },
    { id: "traffic", label: "Traffic" },
    { id: "infos", label: "Infos" }
  ];

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">Modification du Torrent episode {episodeNumber}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <AlternateTrackedEpisodeLine trackedEpisode={trackedEpisode} />
        </TableContainer>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headCells.map(cell => (
                    <FilterHeaderCell key={cell.id} {...cell} {...sortObj} />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortFunction(alternateTrackedEpisodes)
                  .slice(sliceBegin, sliceEnd)
                  .map(trackedEpisode => (
                    <AlternateTrackedEpisodeLine
                      trackedEpisode={trackedEpisode}
                      key={`track-${trackedEpisode.torrentId}`}
                      selectedValue={selectedValue}
                      handleChange={handleChange}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={alternateTrackedEpisodes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={labelTemplate}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleModifier} color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}
