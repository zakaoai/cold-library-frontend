import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"

import { useCallback, useEffect, useState } from "react"

const useAlternateTrackedTorrentEpisode = (
  trackedEpisode: AnimeEpisodeTorrentDisplay | undefined,
  handleClose: () => void
) => {
  const { patchTrackedAnimeEpisode: updateTrackedEpisode, setAnimeEpisodeTorrents } = useAnimeTorrentRowContext()
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

  useEffect(() => {
    if (trackedEpisode !== undefined) {
      const { malId, episodeNumber } = trackedEpisode
      void AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber).then(episode => {
        setUpdatedTrackedEpisode(formatEpisode(episode))
        setAnimeEpisodeTorrents(episodes =>
          episodes.map(ep => (ep.episodeNumber === episodeNumber ? formatEpisode(episode) : ep))
        )
      })

      void AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list => {
        {
          setTrackedEpisodeAlternates(list.map(formatEpisode))
        }
      })
    }
  }, [setAnimeEpisodeTorrents, trackedEpisode])

  return {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes: trackedEpisodeAlternates,
    selectedValue,
    updatedTrackedEpisode
  }
}

export default useAlternateTrackedTorrentEpisode
