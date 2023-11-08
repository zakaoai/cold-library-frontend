import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from "@tanstack/react-query"

import { useCallback, type PropsWithChildren } from "react"

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const onErrorConnection = useCallback((error: Error) => {
    // notification.warning({ message: "Vous avez été deconnecté du serveur" })
    console.log("Une erreur est arrivé")
  }, [])

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
