import useAppContext from "@/hooks/context/useAppContext"
import { type AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import AnimeTorrentService from "@/services/AnimeTorrentService"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"

export default function useTrackedTorrent() {
  const { torrentLibrary, setTorrentLibrary } = useAppContext()

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["torrentLibrary"],
    queryFn: async () => await AnimeTorrentService.getAll(),
    retry: false
  })

  useEffect(() => {
    if (isFetched && data != undefined && data != torrentLibrary) {
      setTorrentLibrary(data)
    }
  }, [torrentLibrary, data, isFetched, setTorrentLibrary])

  const updateTrackedAnime = useCallback(
    (updatedTrackedAnime: AnimeTorrentDTO) => {
      setTorrentLibrary(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
        )
      )
    },
    [setTorrentLibrary]
  )

  return { isFetching, updateTrackedAnime }
}
