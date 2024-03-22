import useEditProfilModal from "@/hooks/containers/Activite/Profile/useEditProfilModal"
import IEditProfilModal from "@/interfaces/containers/Activite/Profile/EditProfilModal"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

const EditProfilModal = ({ open, handleClose }: IEditProfilModal) => {
  const { handleSubmit, onSubmit, errors, register, handleCloseForm } = useEditProfilModal(handleClose)

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="EditTorrent">Modifier mon profil</DialogTitle>
        <DialogContent
          sx={{
            "& .MuiTextField-root": { m: 1 }
          }}>
          <TextField
            label="MyAnimeList Username :"
            id="malUsername"
            autoFocus
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
          <Button onClick={handleCloseForm}>Annuler</Button>
          <Button type="submit">Modifier</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default EditProfilModal
