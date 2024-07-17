import type LogDTO from "@/interfaces/services/LogService/LogDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import LogService from "@/services/LogService"
import UserService from "@/services/UserService"
import type { SelectChangeEvent } from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"

const useAdminLog = () => {
  const [selectedUser, setSelectedUser] = useState<UserDTO | undefined>(undefined)
  const [userLogs, setUserLogs] = useState<LogDTO[]>([])

  const {
    data: logs,
    isFetching: isAllLogFetching,
    refetch: refetchAllLogs
  } = useQuery({
    staleTime: 3600000,
    queryKey: ["AllLogs"],
    queryFn: async () => await LogService.getAll(),
    retry: false
  })

  const { data: users, isFetching: isAllUsersFetching } = useQuery({
    staleTime: 3600000,
    queryKey: ["AllUsers"],
    queryFn: async () => await UserService.getAll(),
    retry: false
  })

  const getLogsByUserCall = useCallback(async (userId: string) => await LogService.getByUser(userId), [])

  const onSuccessGetLogsByUser = useCallback((logs: LogDTO[]) => {
    setUserLogs(logs.toSorted((a, b) => a.id - b.id))
  }, [])

  const onErrorGetLogsByUser = useCallback((error: ResponseError) => {
    console.error(
      "Une erreur est survenue lors de la lecture des logs de l'user %s avec le status %s",
      "a",
      error.response?.status
    )
  }, [])

  const { mutate: getLogsByUser } = useMutation({
    mutationKey: ["user"],
    mutationFn: getLogsByUserCall,
    onSuccess: onSuccessGetLogsByUser,
    onError: onErrorGetLogsByUser
  })

  const handleChangeSelectedUser = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value }
      } = event
      setSelectedUser(users?.find(a => a.id === value))
      if (value !== "all") {
        getLogsByUser(value)
      } else setUserLogs([])
    },
    [getLogsByUser, users]
  )

  return {
    logs: logs?.toSorted((a, b) => a.id - b.id).toReversed(),
    userLogs: userLogs.toReversed(),
    refetchAllLogs,
    isAllLogFetching,
    users,
    isAllUsersFetching,
    selectedUser,
    handleChangeSelectedUser
  }
}

export default useAdminLog
