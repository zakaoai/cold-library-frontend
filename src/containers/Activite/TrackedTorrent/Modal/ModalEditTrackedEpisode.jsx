import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import usePagination from "hooks/usePagination";
import useSortTable from "hooks/useSortTable";
import FilterHeaderCell from "components/FilterHeaderCell/FilterHeaderCell";
import useAlternateTrackedTorrentEpisode from "hooks/useAlternateTrackedTorrentEpisode";
import AlternateTrackedEpisodeLine from "./AlternateTrackedEpisodeLine";

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

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">Modification du Torrent episode {episodeNumber}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <AlternateTrackedEpisodeLine trackedEpisode={trackedEpisode} />
        </TableContainer>
        <Paper sx={{ width: "100%", marginBottom: "16px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
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
