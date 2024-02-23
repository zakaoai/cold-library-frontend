import SiteMap from "@/routes/SiteMap"
import { useAuth0 } from "@auth0/auth0-react"

import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (!isAuthenticated) {
      enqueueSnackbar<"error">("Vous devez être connecter")
    }
  }, [enqueueSnackbar, isAuthenticated])

  if (isLoading) {
    return (
      <Backdrop open sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate replace to={SiteMap.ACCUEIL.path} />
}

export default ProtectedLayout
