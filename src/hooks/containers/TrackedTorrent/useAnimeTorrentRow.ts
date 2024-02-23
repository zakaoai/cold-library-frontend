import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import { useEffect, useRef } from "react"
import useLibrary from "../AnimeLibrary/useLibrary"

const useAnimeTorrentRow = () => {
  const { doScan, doScanNext } = useAnimeTorrentContext()
  const { animes } = useLibrary()
  const {
    scanEpisodes,
    scanNextEpisode,
    isScanEpisodesPending,
    isScanNextEpisodeAvaible,
    isScanNextEpisodePending,
    setAnime,
    animeTorrent
  } = useAnimeTorrentRowContext()

  const { malId } = animeTorrent

  useEffect(() => {
    const anime = animes.find(animeInLibrary => animeInLibrary.malId == malId)
    if (anime != undefined) setAnime(anime)
  }, [setAnime, animes, malId])

  const prevDoScan = useRef(doScan)
  const prevDoScanNext = useRef(doScanNext)

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
}

export default useAnimeTorrentRow
