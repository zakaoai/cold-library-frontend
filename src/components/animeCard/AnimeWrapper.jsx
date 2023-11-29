import useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import AnimeCardComponent from "./AnimeCardComponent"

export default function AnimeWrapper({ anime, updateAnime, ...others }) {
  const { malId, title, url, imageUrl, type, nbEpisodes } = anime || {}
  const defaultAnime = {
    malId,
    title,
    url,
    imageUrl,
    type,
    nbEpisodes,
    storageState: undefined,
    isComplete: undefined,
    lastAvaibleEpisode: undefined
  }

  const updateAnimeState = useUpdateAnimeState(malId, defaultAnime, updateAnime)

  return <AnimeCardComponent anime={anime} updateAnimeState={updateAnimeState} {...others} />
}
