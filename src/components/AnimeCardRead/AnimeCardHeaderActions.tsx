import AnimeCardLink from "./AnimeCardLink"
import { useAnimeCardReadContext } from "./hooks/useAnimeCardContext"

const AnimeCardHeaderActions = () => {
  const { showEpisodeLink } = useAnimeCardReadContext()

  return showEpisodeLink ? <AnimeCardLink /> : null
}

export default AnimeCardHeaderActions
