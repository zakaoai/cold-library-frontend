import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from "@tanstack/react-query"
import { useSnackbar } from "notistack"

import { useCallback, type PropsWithChildren } from "react"

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const { enqueueSnackbar } = useSnackbar()

  const onErrorConnection = useCallback(
    (error: Error) => {
      enqueueSnackbar("Une erreur est survenue")
    },
    [enqueueSnackbar]
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
