import Skeleton from "@mui/material/Skeleton"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeCardEpisodeNumber = () => {
  const {
    anime: { episodes }
  } = useAnimeCardContext()

  return episodes !== undefined ? (
    `Nb Episodes : ${episodes}`
  ) : (
    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
  )
}

export default AnimeCardEpisodeNumber
