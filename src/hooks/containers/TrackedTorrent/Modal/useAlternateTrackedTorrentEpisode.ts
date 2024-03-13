import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import useAppContext from "@/hooks/context/useAppContext"
import type AnimeEpisodeTorrentDisplay from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay"
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService"
import { formatEpisode } from "@/utils/torrentEpisode"

import usePagination from "@/hooks/usePagination"
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import { useMutation } from "@tanstack/react-query"
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

  const updateTorrentCall = useCallback(
    ({ malId, episodeNumber }: Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">) =>
      AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber),
    []
  )

  const onSuccessUpdateTorrent = useCallback(
    (
      episode: AnimeEpisodeTorrentDTO,
      { malId, episodeNumber }: Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">
    ) => {
      setUpdatedTrackedEpisode(formatEpisode(episode))
      setTorrentEpisodeLibrary(episodes =>
        episodes.map(ep => (ep.malId === malId && ep.episodeNumber === episodeNumber ? formatEpisode(episode) : ep))
      )
    },
    [setTorrentEpisodeLibrary]
  )

  const onErrorUpdateTorrent = useCallback(
    (error: ResponseError, { malId, episodeNumber }: Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">) => {
      console.error(
        "Une erreur est survenue lors de la récupération des nouvelles informations du torrent episode %s de l'anime %s avec le status %s",
        episodeNumber,
        malId,
        error?.response?.status
      )
    },
    []
  )

  const { mutate: updateTorrent } = useMutation<
    AnimeEpisodeTorrentDTO,
    ResponseError,
    Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">
  >({
    mutationFn: updateTorrentCall,
    onSuccess: onSuccessUpdateTorrent,
    onError: onErrorUpdateTorrent
  })

  const searchAlternateEpisodeTorrentCall = useCallback(
    ({ malId, episodeNumber }: Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">) =>
      AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber),
    []
  )

  const onSuccessSearchAlternateEpisodeTorrent = useCallback((episodes: AnimeEpisodeTorrentDTO[]) => {
    setAlternateTrackedEpisodes(episodes.map(formatEpisode))
  }, [])

  const onErrorSearchAlternateEpisodeTorrent = useCallback(
    (error: ResponseError, { malId, episodeNumber }: Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">) => {
      console.error(
        "Une erreur est survenue lors de la récupération des nouvelles informations du torrent episode %s de l'anime %s avec le status %s",
        episodeNumber,
        malId,
        error?.response?.status
      )
    },
    []
  )

  const { mutate: searchAlternateEpisodeTorrent } = useMutation<
    AnimeEpisodeTorrentDTO[],
    ResponseError,
    Pick<AnimeEpisodeTorrentDTO, "malId" | "episodeNumber">
  >({
    mutationFn: searchAlternateEpisodeTorrentCall,
    onSuccess: onSuccessSearchAlternateEpisodeTorrent,
    onError: onErrorSearchAlternateEpisodeTorrent
  })

  useEffect(() => {
    if (selectedEpisodeAlternate !== undefined) {
      const { malId, episodeNumber } = selectedEpisodeAlternate
      updateTorrent({ malId, episodeNumber })
      searchAlternateEpisodeTorrent({ malId, episodeNumber })
    }
  }, [searchAlternateEpisodeTorrent, selectedEpisodeAlternate, setTorrentEpisodeLibrary, updateTorrent])

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
