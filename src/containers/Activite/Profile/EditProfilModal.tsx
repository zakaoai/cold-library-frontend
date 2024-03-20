import useEditProfilModal from "@/hooks/containers/Activite/Profile/useEditProfilModal"
import IEditProfilModal from "@/interfaces/containers/Activite/Profile/EditProfilModal"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

const EditProfilModal = ({ open, handleClose }: IEditProfilModal) => {
  const { handleSubmit, onSubmit, errors, register } = useEditProfilModal(handleClose)

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" }
        }}
        onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="EditTorrent">Modifier mon profil</DialogTitle>
        <DialogContent>
          <TextField
            label="MyAnimeList Username :"
            id="searchWords"
            autoFocus
            margin="dense"
            fullWidth
            error={errors.malUsername !== undefined}
            helperText={errors.malUsername !== undefined ? errors.malUsername.message : ""}
            inputProps={{
              ...register("malUsername", {
                required: "Champs requis"
              })
            }}
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

export default EditProfilModal
