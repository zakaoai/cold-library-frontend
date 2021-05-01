import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { DateTime } from "luxon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";

export default function ModalEditTrackedEpisode({ trackedEpisode = {}, open, handleClose, updateTrackedEpisode }) {
  const handleModifier = () => {
    updateTrackedEpisode({ ...trackedEpisode, searchWords: newSearchWords, dayOfRelease: newDayOfRelease });
    handleClose();
  };

  const trackedEpisodeAlternates = [];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Modification du Torrent </DialogTitle>
      <DialogContent>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Episode</TableCell>
                  <TableCell>Titre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Traffic</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trackedEpisodeAlternates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(trackedEpisode => (
                    <TrackedEpisodeLine trackedEpisode={trackedEpisode} key={episode.episodeNumber} />
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
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ page }) => `page ${page}/${Math.ceil(animeEpisodes.length / rowsPerPage) - 1}`}
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

function TrackedEpisodeLine({ trackedEpisode }) {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const {
    episodeNumber,
    title,
    date,
    torrentLink,
    torrentId,
    torrentSize,
    leechers,
    seeders,
    completed
  } = trackedEpisode;

  const [size, sizeType] = torrentSize.split(" ");

  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow key={animeEpisodeTorrent.torrentId}>
      <TableCell component="th" scope="row">
        <Radio
          checked={selectedValue === torrentId}
          onChange={handleChange}
          value={torrentId}
          name="trackedEpisode"
          inputProps={{ "aria-label": title }}
        />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="right">
        {date && DateTime.fromObject({ year, month, day }).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
      <TableCell component="th" scope="row">
        {formatByteSize(size, sizeType)}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="scan" onClick={() => searchAlternate(episodeNumber)}>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="delete" href={torrentLink}>
          <GetAppIcon />
        </IconButton>
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
