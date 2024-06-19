import RequestService from "@/services/RequestService"
import { useQuery } from "@tanstack/react-query"

const useRequest = () => {
  const { data: requests, isFetching: isAllRequestFetching } = useQuery({
    staleTime: 3600000,
    queryKey: ["AllRequest"],
    queryFn: async () => await RequestService.getAll(),
    retry: false
  })

  return { requests, isAllRequestFetching }
}

export default useRequest
