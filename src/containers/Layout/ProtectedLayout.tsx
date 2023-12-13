import SiteMap from "@/routes/SiteMap"
import { useAuth0 } from "@auth0/auth0-react"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth0()
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (!isAuthenticated) {
      enqueueSnackbar<"error">("Vous devez être connecter")
    }
  }, [])

  return isAuthenticated ? <Outlet /> : <Navigate replace to={SiteMap.ACCUEIL.path} />
}

export default ProtectedLayout
