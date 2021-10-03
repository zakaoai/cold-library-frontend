import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useForm } from "react-hook-form";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%"
    }
  }
}));

export default function ModalEditTrackedTorrent({ trackedTorrent = {}, open, handleClose, updateTrackedAnime }) {
  const { title, searchWords, lastEpisodeOnServer, dayOfRelease } = trackedTorrent;

  const classes = useStyles();

  const defaultValues = {
    searchWords,
    lastEpisodeOnServer,
    dayOfRelease
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const onSubmit = ({ searchWords, dayOfRelease, lastEpisodeOnServer }) => {
    updateTrackedAnime({ ...trackedTorrent, searchWords, dayOfRelease, lastEpisodeOnServer });
    handleClose();
  };

  const days = [
    { value: undefined, libelle: "Choisir un jour" },
    { value: "MONDAY", libelle: "Lundi" },
    { value: "TUESDAY", libelle: "Mardi" },
    { value: "WEDNESDAY", libelle: "Mercredi" },
    { value: "THURSDAY", libelle: "Jeudi" },
    { value: "FRIDAY", libelle: "Vendredi" },
    { value: "SATURDAY", libelle: "Samedi" },
    { value: "SUNDAY", libelle: "Dimanche" }
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="EditTorrent">Modification du Torrent {title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Mots recherché"
            id="searchWords"
            autoFocus
            margin="dense"
            fullWidth
            error={errors.searchWords}
            helperText={errors.searchWords !== undefined ? errors.searchWords.message : ""}
            inputProps={{
              ...register("searchWords", {
                required: "Champs requis"
              })
            }}
          />
          <TextField
            label="Dernier Episode sur le serveur"
            id="lastEpisodeOnServer"
            margin="dense"
            type="number"
            fullWidth
            error={errors.lastEpisodeOnServer}
            helperText={errors.lastEpisodeOnServer !== undefined ? errors.lastEpisodeOnServer.message : ""}
            inputProps={{
              ...register("lastEpisodeOnServer", {
                required: "Champs requis",
                valueAsNumber: true
              })
            }}
          />
          <Controller
            name="dayOfRelease"
            control={control}
            defaultValue={dayOfRelease}
            rules={{ required: "Champs requis" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Jour de sortie"
                id="dayOfRelease"
                select
                name="dayOfRelease"
                error={errors.dayOfRelease}
                helperText={errors.dayOfRelease !== undefined ? errors.dayOfRelease.message : ""}
                value={value}
                onChange={onChange}>
                {days.map(({ value, libelle }) => (
                  <MenuItem key={libelle} value={value}>
                    {libelle}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Modifier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
