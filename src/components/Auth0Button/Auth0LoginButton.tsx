import { useAuth0 } from "@auth0/auth0-react"
import LoginIcon from "@mui/icons-material/Login"
import { Button, Typography } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Tooltip title="Se connecter">
      <Button
        onClick={() => {
          void loginWithRedirect()
        }}
        endIcon={<LoginIcon />}
        sx={{ ml: 2 }}>
        <Typography sx={{ display: { xs: "none", md: "block" } }}>Login</Typography>
      </Button>
    </Tooltip>
  )
}

export default Auth0LoginButton
