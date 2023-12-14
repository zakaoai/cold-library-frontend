import { useTrackedTorrentRowContext } from "@/hooks/context/useTrackedTorrentRowContext"
import { AnimeEpisodeTorrentDisplay } from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatByteSize, getBytesSize } from "@/utils/byteSize"
import { formatEpisode } from "@/utils/torrentEpisode"

import { useCallback, useEffect, useState } from "react"

const useAlternateTrackedTorrentEpisode = (trackedEpisode: AnimeEpisodeTorrentDTO, handleClose: () => void) => {
  const { patchTrackedAnimeEpisode: updateTrackedEpisode, setEpisodes } = useTrackedTorrentRowContext()
  const [trackedEpisodeAlternates, setTrackedEpisodeAlternates] = useState<AnimeEpisodeTorrentDisplay[]>([])
  const [updatedTrackedEpisode, setUpdatedTrackedEpisode] = useState(trackedEpisode)

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value)
    },
    [setSelectedValue]
  )
  const handleModifier = useCallback(() => {
    if (selectedValue) {
      const updatedTrackedEpisodeAlternate = trackedEpisodeAlternates.find(
        ep => ep.torrentId.toString() == selectedValue
      )
      if (updatedTrackedEpisodeAlternate != undefined) updateTrackedEpisode(updatedTrackedEpisodeAlternate)
      handleClose()
    }
  }, [selectedValue, trackedEpisodeAlternates, updateTrackedEpisode, handleClose])

  const { malId, episodeNumber } = trackedEpisode

  useEffect(() => {
    void AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber).then(episode => {
      setUpdatedTrackedEpisode(formatEpisode(episode))
      setEpisodes(episodes => episodes.map(ep => (ep.episodeNumber === episodeNumber ? formatEpisode(episode) : ep)))
    })

    void AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list => {
      {
        setTrackedEpisodeAlternates(
          list.map(ep => {
            const torrentSizeSplit = ep.torrentSize.split(" ")
            const byteSize = getBytesSize(...torrentSizeSplit)
            const displaySize = formatByteSize(...torrentSizeSplit)

            return { ...ep, dateObj: new Date(ep.date), byteSize, displaySize }
          })
        )
      }
    })
  }, [episodeNumber, malId, setEpisodes, trackedEpisode])

  return {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes: trackedEpisodeAlternates,
    selectedValue,
    updatedTrackedEpisode
  }
}

export default useAlternateTrackedTorrentEpisode
