import useAppContext from "@/hooks/context/useAppContext"
import type ResponseError from "@/interfaces/services/ResponseError"
import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import UserService from "@/services/UserService"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import useProfil from "./useProfile"

const useEditProfilModal = (handleClose: () => void) => {
  const { setUser } = useAppContext()
  const { user: serverUser } = useProfil()
  const { malUsername } = serverUser ?? {}

  const { enqueueSnackbar } = useSnackbar()

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
    async (malUserName: string) => await UserService.updateCurrentMalUsername(malUserName),
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
    enqueueSnackbar({
      message: "Une erreur est survenue lors du scan des épisodes",
      variant: "error"
    })
    console.error("Une erreur est survenue lors du scan des épisodes %s", error.response?.status)
  }, [])

  const { mutate: updateCurrentMalUsername } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateCurrentMalUsernameCall,
    onSuccess: onSuccessUpdateCurentMalUsername,
    onError: onErrorScanEpisodes
  })

  const onSubmit = useCallback(
    ({ malUsername }: UserDTO) => {
      updateCurrentMalUsername(malUsername ?? "")
    },
    [updateCurrentMalUsername]
  )

  return { handleSubmit, onSubmit, errors, register, handleCloseForm }
}

export default useEditProfilModal
