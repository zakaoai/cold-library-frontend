import ResponseError from "@/interfaces/services/ResponseError"
import SiteMap from "@/routes/SiteMap"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from "@tanstack/react-query"
import { useSnackbar } from "notistack"

import { useCallback, type PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onErrorConnection = useCallback(
    (error: ResponseError) => {
      if (error?.response?.status === 403) {
        enqueueSnackbar("Vous n'avez pas la permission d'accéder à ce contenu")
        navigate(SiteMap.ACCUEIL.path, { replace: true })
      } else enqueueSnackbar("Une erreur est survenue")
    },
    [enqueueSnackbar, navigate]
  )

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: onErrorConnection
    }),
    mutationCache: new MutationCache({
      onError: onErrorConnection
    })
  })

  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default QueryClientProvider
