import { useAuth0 } from "@auth0/auth0-react"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

const Profile = () => {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia sx={{ height: 200 }} image={user?.picture} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nom : {user?.nickname}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Username : {user?.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Email : {user?.email}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Roles : {user?.["zakaoai.eu.auth0.com/roles"].join(",")}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Last Update : {user?.updated_at && new Date(user?.updated_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Profile
