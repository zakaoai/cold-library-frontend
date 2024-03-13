import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"

import usePagination from "@/hooks/usePagination"
import { useCallback, useEffect, useState } from "react"
import useSortTable from "./useSortTable"

const useAlternateTrackedTorrentEpisode = () => {
  const { setTorrentEpisodeLibrary } = useAppContext()

  const {
    patchTrackedAnimeEpisode: updateTrackedEpisode,
    setShowModalAlternateEpisode,
    setSelectedEpisodeAlternate,
    selectedEpisodeAlternate,
    showModalAlternateEpisode
  } = useAnimeTorrentRowContext()
  const [alternateTrackedEpisodes, setAlternateTrackedEpisodes] = useState<AnimeEpisodeTorrentDisplay[]>([])
  const [updatedTrackedEpisode, setUpdatedTrackedEpisode] = useState(selectedEpisodeAlternate)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  const handleClose = useCallback(() => {
    setShowModalAlternateEpisode(false)
    setSelectedEpisodeAlternate(undefined)
    setAlternateTrackedEpisodes([])
    setUpdatedTrackedEpisode(undefined)
  }, [setShowModalAlternateEpisode, setSelectedEpisodeAlternate])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value)
    },
    [setSelectedValue]
  )
  const handleModifier = useCallback(() => {
    if (selectedValue) {
      const updatedTrackedEpisodeAlternate = alternateTrackedEpisodes.find(
        ep => ep.torrentId.toString() == selectedValue
      )
      if (updatedTrackedEpisodeAlternate != undefined) updateTrackedEpisode(updatedTrackedEpisodeAlternate)
      handleClose()
    }
  }, [selectedValue, alternateTrackedEpisodes, updateTrackedEpisode, handleClose])

  useEffect(() => {
    if (selectedEpisodeAlternate !== undefined) {
      const { malId, episodeNumber, id } = selectedEpisodeAlternate
      void AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber).then(episode => {
        setUpdatedTrackedEpisode(formatEpisode(episode))
        setTorrentEpisodeLibrary(episodes => episodes.map(ep => (ep.id === id ? formatEpisode(episode) : ep)))
      })

      void AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list => {
        {
          setAlternateTrackedEpisodes(list.map(formatEpisode))
        }
      })
    }
  }, [selectedEpisodeAlternate, setTorrentEpisodeLibrary])

  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination(alternateTrackedEpisodes)
  const paginationProps = {
    rowsPerPage,
    page,
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage,
    labelDisplayedRows: labelTemplate
  }

  const sortObj = useSortTable<AnimeEpisodeTorrentDisplay>()

  return {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes,
    setAlternateTrackedEpisodes,
    selectedValue,
    updatedTrackedEpisode,
    handleClose,
    showModalAlternateEpisode,
    sortObj,
    sliceBegin,
    sliceEnd,
    paginationProps
  }
}

export default useAlternateTrackedTorrentEpisode
