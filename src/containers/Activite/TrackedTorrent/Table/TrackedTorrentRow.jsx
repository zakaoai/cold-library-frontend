import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

import DayOfWeek from "@/constants/DayOfWeek"
import useTrackedTorrentEpisodes from "@/hooks/containers/TrackedTorrent/useTrackedTorrentEpisodes"
import CircularProgress from "@mui/material/CircularProgress"
import AnimeTorrentEpisodeTable from "./AnimeTorrentEpisodeTable"

import ModalEditTrackedEpisode from "../Modal/ModalEditTrackedEpisode"

import { NavLink } from "react-router-dom"

import ArrowCollapse from "@/components/ArrowCollapse/ArrowCollapse"
import { useTrackedTorrentContext } from "@/context/TrackedTorrentContext"

import { Link, useMediaQuery } from "@mui/material"
import TrackedTorrentActions from "./TrackedTorrentActions"

import { TrackedTorrentRowProvider } from "@/context/TrackedTorrentRowProvider"
import { useTheme } from "@emotion/react"

export default function TrackedTorrentRow({ trackedTorrent }) {
  const { doScan, doScanNext } = useTrackedTorrentContext()
  const prevDoScan = useRef(doScan)
  const prevDoScanNext = useRef(doScanNext)
  const { lastEpisodeOnServer, malId } = trackedTorrent

  const [open, setOpen] = useState(false)
  const [showModalAlternateEpisode, setShowModalAlternateEpisode] = useState(false)
  const [selectedEpisodeAlternate, setSelectedEpisodeAlternate] = useState(undefined)

  const {
    episodes,
    isFetching,
    scanEpisodes,
    isScanEpisodesPending,
    scanNextEpisode,
    patchTrackedAnimeEpisode,
    searchPack,
    deleteTorrent,
    setEpisodes,
    isScanNextEpisodeAvaible,
    isScanNextEpisodePending
  } = useTrackedTorrentEpisodes(malId, lastEpisodeOnServer)

  useEffect(() => {
    if (doScan != prevDoScan.current && !isScanEpisodesPending) {
      prevDoScan.current = Boolean(doScan)
      scanEpisodes()
    }
  }, [doScan, isScanEpisodesPending, prevDoScan, scanEpisodes])

  useEffect(() => {
    if (doScanNext != prevDoScanNext.current && isScanNextEpisodeAvaible && !isScanNextEpisodePending) {
      scanNextEpisode()
      prevDoScanNext.current = Boolean(doScanNext)
    }
  }, [doScanNext, isScanNextEpisodeAvaible, isScanNextEpisodePending, prevDoScanNext, scanNextEpisode])

  const showedTorrents = useMemo(
    () => episodes.filter(({ episodeNumber }) => episodeNumber >= lastEpisodeOnServer || episodeNumber === 0),
    [episodes, lastEpisodeOnServer]
  )

  const handleCloseEpAlternateModal = useCallback(() => {
    setShowModalAlternateEpisode(false)
    setSelectedEpisodeAlternate(undefined)
  }, [setShowModalAlternateEpisode, setSelectedEpisodeAlternate])

  const theme = useTheme()
  const isUpToMd = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <TrackedTorrentRowProvider
      value={{
        setEpisodes,
        trackedTorrent,
        deleteTorrent,
        setSelectedEpisodeAlternate,
        setShowModalAlternateEpisode,
        patchTrackedAnimeEpisode,
        searchPack,
        showedTorrents,
        scanEpisodes,
        scanNextEpisode
      }}>
      {isUpToMd && (
        <TrackedTorrentRowDesktop
          showedTorrents={showedTorrents}
          open={open}
          setOpen={setOpen}
          isFetching={isFetching}
          {...trackedTorrent}
        />
      )}

      {!isUpToMd && (
        <TrackedTorrentRowMobile
          showedTorrents={showedTorrents}
          open={open}
          setOpen={setOpen}
          isFetching={isFetching}
          {...trackedTorrent}
        />
      )}

      {showedTorrents.length !== 0 && <AnimeTorrentEpisodeTable torrents={showedTorrents} listOpen={open} />}
      {selectedEpisodeAlternate && (
        <ModalEditTrackedEpisode
          handleClose={handleCloseEpAlternateModal}
          open={showModalAlternateEpisode}
          trackedEpisode={selectedEpisodeAlternate}
        />
      )}
    </TrackedTorrentRowProvider>
  )
}

const TrackedTorrentRowMobile = ({
  showedTorrents,
  open,
  setOpen,
  malId,
  title,
  isFetching,
  type,
  lastEpisodeOnServer,
  searchWords,
  dayOfRelease
}) => (
  <>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Anime
      </TableCell>
      <TableCell component="th" scope="row">
        <Link to={`/app/anime/${malId}`} component={NavLink}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        </Link>
        {isFetching ? <CircularProgress /> : null}
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Type
      </TableCell>
      <TableCell component="th" scope="row">
        {type}
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Last ep
      </TableCell>
      <TableCell component="th" scope="row">
        {lastEpisodeOnServer}
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Mots recherché
      </TableCell>
      <TableCell component="th" scope="row">
        {searchWords}
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Jour de sortie
      </TableCell>
      <TableCell component="th" scope="row">
        {DayOfWeek[dayOfRelease]}
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        Actions
      </TableCell>
      <TableCell component="th" scope="row">
        <TrackedTorrentActions />
      </TableCell>
    </TableRow>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell colSpan={2}>
        {showedTorrents.length !== 0 && <ArrowCollapse open={open} setOpen={setOpen} />}
      </TableCell>
    </TableRow>
  </>
)

const TrackedTorrentRowDesktop = ({
  showedTorrents,
  setOpen,
  open,
  malId,
  title,
  isFetching,
  type,
  lastEpisodeOnServer,
  searchWords,
  dayOfRelease
}) => (
  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
    <TableCell component="th">
      {showedTorrents.length !== 0 && <ArrowCollapse open={open} setOpen={setOpen} />}
    </TableCell>
    <TableCell component="th" scope="row">
      <Link to={`/app/anime/${malId}`} component={NavLink}>
        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>{title}</div>
      </Link>
      {isFetching ? <CircularProgress /> : null}
    </TableCell>
    <TableCell component="th" scope="row">
      {type}
    </TableCell>
    <TableCell component="th" scope="row">
      {lastEpisodeOnServer}
    </TableCell>
    <TableCell component="th" scope="row">
      {searchWords}
    </TableCell>
    <TableCell component="th" scope="row">
      {DayOfWeek[dayOfRelease]}
    </TableCell>
    <TableCell component="th" scope="row">
      <TrackedTorrentActions />
    </TableCell>
  </TableRow>
)
