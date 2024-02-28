import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"

import { useCallback, useEffect, useState } from "react"

const useAlternateTrackedTorrentEpisode = (
  trackedEpisode: AnimeEpisodeTorrentDisplay | undefined,
  handleClose: () => void
) => {
  const { setTorrentEpisodeLibrary } = useAppContext()
  const { patchTrackedAnimeEpisode: updateTrackedEpisode } = useAnimeTorrentRowContext()
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
      const { malId, episodeNumber, id } = trackedEpisode
      void AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber).then(episode => {
        setUpdatedTrackedEpisode(formatEpisode(episode))
        setTorrentEpisodeLibrary(episodes => episodes.map(ep => (ep.id === id ? formatEpisode(episode) : ep)))
      })

      void AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list => {
        {
          setTrackedEpisodeAlternates(list.map(formatEpisode))
        }
      })
    }
  }, [setTorrentEpisodeLibrary, trackedEpisode])

  return {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes: trackedEpisodeAlternates,
    selectedValue,
    updatedTrackedEpisode
  }
}

export default useAlternateTrackedTorrentEpisode
