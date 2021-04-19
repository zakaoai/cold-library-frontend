import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function ModalEditTrackedEpisode({ trackedEpisode = {}, open, handleClose, updateTrackedEpisode }) {
  const handleModifier = () => {
    updateTrackedAnime({ ...trackedTorrent, searchWords: newSearchWords, dayOfRelease: newDayOfRelease });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Modification du Torrent </DialogTitle>
    </Dialog>
  );
}
