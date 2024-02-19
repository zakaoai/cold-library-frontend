import AnimeCardLink from "./AnimeCardLink"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeCardHeaderActions = () => {
  const { showEpisodeLink } = useAnimeCardContext()

  return showEpisodeLink ? <AnimeCardLink /> : null
}

export default AnimeCardHeaderActions
