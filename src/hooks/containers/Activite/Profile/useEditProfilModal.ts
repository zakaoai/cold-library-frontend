import useAppContext from "@/hooks/context/useAppContext"
import ResponseError from "@/interfaces/services/ResponseError"
import UserDTO from "@/interfaces/services/UserService/UserDTO"
import UserService from "@/services/UserService"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import useProfil from "./useProfile"

const useEditProfilModal = (handleClose: () => void) => {
  const { setUser } = useAppContext()
  const { user: serverUser } = useProfil()
  const { malUsername } = serverUser || {}

  const defaultValues = useMemo(
    () => ({
      malUsername
    }),
    [malUsername]
  )

  const form = useForm<Omit<UserDTO, "malId">>({ defaultValues })
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset
  } = form

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const handleCloseForm = useCallback(() => {
    clearErrors()
    handleClose()
  }, [clearErrors, handleClose])

  const updateCurrentMalUsernameCall = useCallback(
    (malUserName: string) => UserService.updateCurrentMalUsername(malUserName),
    []
  )

  const onSuccessUpdateCurentMalUsername = useCallback(
    (user: UserDTO) => {
      setUser(user)
      handleCloseForm()
    },
    [handleCloseForm, setUser]
  )

  const onErrorScanEpisodes = useCallback((error: ResponseError) => {
    console.error("Une erreur est survenue lors de la mise à jour du profile utilisateur %s", error?.response?.status)
  }, [])

  const { mutate: updateCurrentMalUsername } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateCurrentMalUsernameCall,
    onSuccess: onSuccessUpdateCurentMalUsername,
    onError: onErrorScanEpisodes
  })

  const onSubmit = useCallback(
    ({ malUsername }: UserDTO) => {
      updateCurrentMalUsername(malUsername!)
    },
    [updateCurrentMalUsername]
  )

  return { handleSubmit, onSubmit, errors, register, handleCloseForm }
}

export default useEditProfilModal
