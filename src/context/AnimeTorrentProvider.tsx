import useTrackedTorrent from "@/hooks/containers/TrackedTorrent/useTrackedTorrent"
import type { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import type { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AnimeTorrentContext from "./AnimeTorrentContext"

const AnimeTorrentProvider = ({ children }: PropsWithChildren) => {
  const { isTorrentEpisodesFetching, animeTorrents, torrentEpisodes } = useTrackedTorrent()
  const [showModal, setShowModal] = useState(false)
  const [doScan, setDoScan] = useState(false)
  const [doScanNext, setDoScanNext] = useState(false)

  const [editableTrackedAnime, setEditableTrackedAnime] = useState<AnimeTorrentDTO | undefined>(undefined)

  const torrentEpisodesMap = useMemo(
    () =>
      torrentEpisodes.reduce((prev, curr) => {
        if (!prev.has(curr.malId)) {
          prev.set(curr.malId, [])
        }
        prev.get(curr.malId)?.push(curr)
        return prev
      }, new Map<number, AnimeEpisodeTorrentDTO[]>()),
    [torrentEpisodes]
  )

  const value = useMemo(
    () => ({
      torrentEpisodes,
      animeTorrents,
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
    [doScan, doScanNext, editableTrackedAnime, isTorrentEpisodesFetching, showModal, torrentEpisodesMap]
  )

  return <AnimeTorrentContext.Provider value={value}>{children}</AnimeTorrentContext.Provider>
}

export default AnimeTorrentProvider
