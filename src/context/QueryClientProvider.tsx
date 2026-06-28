import type ResponseError from "@/interfaces/services/ResponseError"
import SiteMap from "@/routes/SiteMap"
import { ErrorType, requiresReAuth, standardizeError } from "@/services/errorHandling"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from "@tanstack/react-query"
import { useSnackbar } from "notistack"

import { useCallback, useState, type PropsWithChildren } from "react"
import { useNavigate } from "react-router"

const createQueryClient = (onErrorConnection: (error: ResponseError) => void) =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: onErrorConnection
    }),
    mutationCache: new MutationCache({
      onError: onErrorConnection
    })
  })

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onErrorConnection = useCallback(
    (error: ResponseError) => {
      const standardError = standardizeError(error)

      if (requiresReAuth(standardError)) {
        enqueueSnackbar(standardError.message, { variant: "warning" })
        navigate(SiteMap.ACCUEIL.path, { replace: true })
        return
      }

      if (standardError.type === ErrorType.NOT_FOUND) {
        return
      }

      enqueueSnackbar(standardError.message, { variant: "error" })
    },
    [enqueueSnackbar, navigate]
  )

  const [queryClient] = useState(() => createQueryClient(onErrorConnection))

  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default QueryClientProvider
