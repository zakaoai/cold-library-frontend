import { AnimeEpisodeTorrentDisplay } from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { formatByteSize, getBytesSize } from "./byteSize"

export const formatEpisode = (ep: AnimeEpisodeTorrentDTO) => {
  const torrentSizeSplit = ep?.torrentSize?.split(" ")
  const byteSize = getBytesSize(...torrentSizeSplit)
  const displaySize = formatByteSize(...torrentSizeSplit)

  return { ...ep, byteSize, displaySize, dateObj: new Date(ep?.date) } as AnimeEpisodeTorrentDisplay
}
