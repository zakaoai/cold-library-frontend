import { useAuth0 } from "@auth0/auth0-react"
import { useCallback, useState } from "react"
import useProfil from "./useProfile"

const useProfilActivity = () => {
  const { user, isLoading } = useAuth0()
  const { user: serverUser } = useProfil()
  const { malUsername } = serverUser || {}

  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const onClickEditProfil = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return { isLoading, user, malUsername, open, handleClose, onClickEditProfil }
}
export default useProfilActivity
