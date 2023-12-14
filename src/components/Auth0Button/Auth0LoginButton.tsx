import { useAuth0 } from "@auth0/auth0-react"
import LoginIcon from "@mui/icons-material/Login"
import { IconButton, Tooltip } from "@mui/material"

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Tooltip title="Se connecter">
      <IconButton onClick={() => loginWithRedirect()} sx={{ ml: 2 }}>
        <LoginIcon />
      </IconButton>
    </Tooltip>
  )
}

export default Auth0LoginButton
