import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import type { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { formatByteSize, getBytesSize } from "./byteSize"

export const formatEpisode = (ep: AnimeEpisodeTorrentDTO): AnimeEpisodeTorrentDisplay => {
  const torrentSizeSplit = ep.torrentSize.split(" ") as [string, string]
  const byteSize = getBytesSize(...torrentSizeSplit)
  const displaySize = formatByteSize(...torrentSizeSplit)

  return { ...ep, byteSize, displaySize, dateObj: new Date(ep.date) }
}
