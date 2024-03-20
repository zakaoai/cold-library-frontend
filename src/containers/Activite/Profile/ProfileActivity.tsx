import useProfil from "@/hooks/containers/Activite/Profile/useProfile"
import { useAuth0 } from "@auth0/auth0-react"
import TextField from "@mui/material/TextField"

import UserDTO from "@/interfaces/services/UserService/UserDTO"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { AppBar, Button, Table, TableCell, TableRow } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Unstable_Grid2"
import { useForm } from "react-hook-form"

const Profile = () => {
  const { user, isLoading } = useAuth0()
  const { user: serverUser } = useProfil()
  const { malUsername } = serverUser || {}
  console.log("🚀 ~ Profile ~ serverUser:", serverUser)

  const defaultValues = {
    malUsername
  }

  const {
    register,
    // handleSubmit,
    formState: { errors }
  } = useForm<Omit<UserDTO, "malId">>({ defaultValues })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <AppBar position="relative" color="transparent">
          <Grid xsOffset={10} xs={2}>
            <Button onClick={() => null} title={"Edit"} startIcon={<ModeEditIcon />}>
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
            </Table>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid>content</Grid>
    </Grid>
  )
}

export default Profile
