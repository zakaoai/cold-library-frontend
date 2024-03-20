import useProfilActivity from "@/hooks/containers/Activite/Profile/useProfilActivity"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { AppBar, Button, Table, TableBody, TableCell, TableRow } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Unstable_Grid2"
import EditProfilModal from "./EditProfilModal"

const Profile = () => {
  const { isLoading, user, malUsername, open, handleClose, onClickEditProfil } = useProfilActivity()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <AppBar position="relative" color="transparent">
          <Grid xsOffset={10} xs={2}>
            <Button onClick={onClickEditProfil} title={"Edit"} startIcon={<ModeEditIcon />}>
              Editer le profil
            </Button>
          </Grid>
        </AppBar>
      </Grid>
      <Grid xs={4}>
        <Card>
          <CardMedia sx={{ height: 200 }} image={user?.picture} />
          <CardContent sx={{ padding: 0 }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Nom :</TableCell>
                  <TableCell>{user?.nickname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Username :</TableCell>
                  <TableCell>{user?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email :</TableCell>
                  <TableCell>{user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Roles :</TableCell>
                  <TableCell>{user?.["zakaoai.eu.auth0.com/roles"].join(",")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MyAnimeList Username :</TableCell>
                  <TableCell>{malUsername}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid>Contenue à venir</Grid>
      <EditProfilModal handleClose={handleClose} open={open} />
    </Grid>
  )
}

export default Profile
