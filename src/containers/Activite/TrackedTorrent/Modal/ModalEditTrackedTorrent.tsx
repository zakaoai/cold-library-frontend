import useAppContext from "@/hooks/context/useAppContext"
import { useTrackedTorrentContext } from "@/hooks/context/useTrackedTorrentContext"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"

const ModalEditTrackedTorrent = () => {
  const {
    editableTrackedAnime,
    updateTrackedAnime: patchAnime,
    setShowModal,
    setEditableTrackedAnime,
    showModal: open
  } = useTrackedTorrentContext()

  const { animeLibrary } = useAppContext()

  const anime = animeLibrary.find(anime => anime.malId === editableTrackedAnime?.malId)
  const { title } = anime || {}
  const { searchWords, lastEpisodeOnServer, dayOfRelease } = editableTrackedAnime || {}

  const handleClose = useCallback(() => {
    setShowModal(false)
    setEditableTrackedAnime(undefined)
  }, [setEditableTrackedAnime, setShowModal])

  const updateTrackedAnime = useCallback(
    async (trackedAnime: AnimeTorrentDTO) =>
      await AnimeTorrentService.update(trackedAnime.malId, trackedAnime).then(newTrackedAnime =>
        patchAnime(newTrackedAnime)
      ),
    [patchAnime]
  )
  const defaultValues = {
    searchWords,
    lastEpisodeOnServer,
    dayOfRelease
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Pick<AnimeTorrentDTO, "searchWords" | "dayOfRelease" | "lastEpisodeOnServer">>({ defaultValues })

  const onSubmit = useCallback(
    ({
      searchWords,
      dayOfRelease,
      lastEpisodeOnServer
    }: Pick<AnimeTorrentDTO, "searchWords" | "dayOfRelease" | "lastEpisodeOnServer">) => {
      if (editableTrackedAnime != undefined)
        updateTrackedAnime({ ...editableTrackedAnime, searchWords, dayOfRelease, lastEpisodeOnServer })
      handleClose()
    },
    [updateTrackedAnime, editableTrackedAnime, handleClose]
  )

  const days = [
    { value: undefined, libelle: "Choisir un jour" },
    { value: "MONDAY", libelle: "Lundi" },
    { value: "TUESDAY", libelle: "Mardi" },
    { value: "WEDNESDAY", libelle: "Mercredi" },
    { value: "THURSDAY", libelle: "Jeudi" },
    { value: "FRIDAY", libelle: "Vendredi" },
    { value: "SATURDAY", libelle: "Samedi" },
    { value: "SUNDAY", libelle: "Dimanche" }
  ]

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" }
        }}
        onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="EditTorrent">Modification du Torrent {title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Mots recherché"
            id="searchWords"
            autoFocus
            margin="dense"
            fullWidth
            error={errors.searchWords !== undefined}
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
            error={errors.lastEpisodeOnServer !== undefined}
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
                error={errors.dayOfRelease !== undefined}
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
      </Box>
    </Dialog>
  )
}

export default ModalEditTrackedTorrent
