import useTrackedTorrent from "@/hooks/containers/TrackedTorrent/useTrackedTorrent"
import useAppContext from "@/hooks/context/useAppContext"
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { PropsWithChildren, useMemo, useState } from "react"
import AnimeTorrentContext from "./AnimeTorrentContext"

const AnimeTorrentProvider = ({ children }: PropsWithChildren) => {
  const { updateTrackedAnime, isTorrentEpisodesFetching } = useTrackedTorrent()
  const [showModal, setShowModal] = useState(false)
  const [doScan, setDoScan] = useState(false)
  const [doScanNext, setDoScanNext] = useState(false)
  const { torrentEpisodeLibrary } = useAppContext()

  const [editableTrackedAnime, setEditableTrackedAnime] = useState<AnimeTorrentDTO | undefined>(undefined)

  const torrentEpisodesMap = useMemo(
    () =>
      torrentEpisodeLibrary.reduce((prev, curr) => {
        if (!prev.has(curr.malId)) {
          prev.set(curr.malId, [])
        }
        prev.get(curr.malId)?.push(curr)
        return prev
      }, new Map<number, AnimeEpisodeTorrentDTO[]>()),
    [torrentEpisodeLibrary]
  )

  const value = useMemo(
    () => ({
      updateTrackedAnime,
      showModal,
      setShowModal,
      doScan,
      setDoScan,
      doScanNext,
      setDoScanNext,
      editableTrackedAnime,
      setEditableTrackedAnime,
      torrentEpisodesMap,
      isTorrentEpisodesFetching
    }),
    [
      doScan,
      doScanNext,
      editableTrackedAnime,
      isTorrentEpisodesFetching,
      showModal,
      torrentEpisodesMap,
      updateTrackedAnime
    ]
  )

  return <AnimeTorrentContext.Provider value={value}>{children}</AnimeTorrentContext.Provider>
}

export default AnimeTorrentProvider
