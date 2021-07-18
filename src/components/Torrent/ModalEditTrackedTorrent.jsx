import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function ModalEditTrackedTorrent({ trackedTorrent = {}, open, handleClose, updateTrackedAnime }) {
  const { title, searchWords, dayOfRelease } = trackedTorrent;
  const [newSearchWords, setNewSearchWords] = useState(searchWords);
  const [newDayOfRelease, setNewDayOfRelease] = useState(dayOfRelease);

  const handleModifier = () => {
    updateTrackedAnime({ ...trackedTorrent, searchWords: newSearchWords, dayOfRelease: newDayOfRelease });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Modification du Torrent {title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Mots rechercher"
          type="text"
          fullWidth
          value={newSearchWords}
          onChange={event => setNewSearchWords(event.target.value)}
        />
        <InputLabel id="dayOfRelease">Jour de sortie</InputLabel>
        <Select
          labelId="dayOfRelease"
          id="dayOfRelease"
          value={newDayOfRelease}
          onChange={event => setNewDayOfRelease(event.target.value)}>
          <MenuItem value={"MONDAY"}>Lundi</MenuItem>
          <MenuItem value={"TUESDAY"}>Mardi</MenuItem>
          <MenuItem value={"WEDNESDAY"}>Mercredi</MenuItem>
          <MenuItem value={"THURSDAY"}>Jeudi</MenuItem>
          <MenuItem value={"FRIDAY"}>Vendredi</MenuItem>
          <MenuItem value={"SATURDAY"}>Samedi</MenuItem>
          <MenuItem value={"SUNDAY"}>Dimanche</MenuItem>
        </Select>
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
