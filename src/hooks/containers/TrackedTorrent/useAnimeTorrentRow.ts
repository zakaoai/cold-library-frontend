import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import { useEffect } from "react"
import useLibrary from "../AnimeLibrary/useLibrary"

const useAnimeTorrentRow = () => {
  const { animes } = useLibrary()
  const { setAnime, animeTorrent } = useAnimeTorrentRowContext()

  const { malId } = animeTorrent

  useEffect(() => {
    const anime = animes.find(animeInLibrary => animeInLibrary.malId == malId)
    if (anime != undefined) setAnime(anime)
  }, [setAnime, animes, malId])
}

export default useAnimeTorrentRow
