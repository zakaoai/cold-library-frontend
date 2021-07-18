import React, { useEffect, useState } from "react";
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
import { IconButton, makeStyles, Radio, TablePagination } from "@material-ui/core";
import formatByteSize from "~/utils/byteSize";
import InfoIcon from "@material-ui/icons/Info";
import AnimeTorrentEpisodeService from "~/services/AnimeTorrentEpisodeService";

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
  const [trackedEpisodeAlternates, setTrackedEpisodeAlternates] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedValue, setSelectedValue] = useState(undefined);

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const handleModifier = () => {
    if (selectedValue) {
      updateTrackedEpisode(trackedEpisodeAlternates.find(ep => ep.torrentId == selectedValue));
      handleClose();
    }
  };

  const {
    malId,
    episodeNumber,
    title,
    date = [],
    torrentId,
    torrentSize = "",
    leechers,
    seeders,
    completed
  } = trackedEpisode;
  const [size, sizeType] = torrentSize.split(" ");
  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;

  useEffect(() => {
    AnimeTorrentEpisodeService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list =>
      setTrackedEpisodeAlternates(list)
    );
  }, [trackedEpisode]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">Modification du Torrent episode {episodeNumber}</DialogTitle>
      <DialogContent>
        <TableRow>
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
          <TableCell component="th" scope="row">
            <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
              <InfoIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Titre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Traffic</TableCell>
                  <TableCell>infos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trackedEpisodeAlternates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(trackedEpisode => (
                    <TrackedEpisodeLine
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
            count={trackedEpisodeAlternates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ page }) =>
              `page ${page}/${Math.ceil(trackedEpisodeAlternates.length / rowsPerPage) - 1}`
            }
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

function TrackedEpisodeLine({ trackedEpisode, selectedValue, handleChange }) {
  const { title, date, torrentId, torrentSize, leechers, seeders, completed } = trackedEpisode;

  const [size, sizeType] = torrentSize.split(" ");

  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow hover onClick={handleChange}>
      <TableCell component="th" scope="row">
        <Radio
          checked={selectedValue == torrentId}
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
      <TableCell component="th" scope="row">
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
