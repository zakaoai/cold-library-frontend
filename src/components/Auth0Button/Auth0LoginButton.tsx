import { useAuth0 } from "@auth0/auth0-react"
import LoginIcon from "@mui/icons-material/Login"
import { IconButton, Tooltip } from "@mui/material"
import Avatar from "@mui/material/Avatar"

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Avatar>
      <Tooltip title="Se connecter">
        <IconButton onClick={() => loginWithRedirect()}>
          <LoginIcon />
        </IconButton>
      </Tooltip>
    </Avatar>
  )
}

export default Auth0LoginButton
