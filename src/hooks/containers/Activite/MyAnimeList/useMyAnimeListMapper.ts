import type { AnimeType } from "@/enums/AnimeType"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { useCallback } from "react"
import useLibrary from "../../AnimeLibrary/useLibrary"

const useMyAnimeListMapper = () => {
  const { animes: animeLibrary } = useLibrary()

  const mappedMALAnime = useCallback(
    (malAnime: MALAnime) => {
      const returnedAnime = {
        ...malAnime,
        malId: malAnime.id,
        malUrl: `https://myanimelist.net/anime/${malAnime.id}`,
        malImg: malAnime.main_picture.medium,
        type: malAnime.media_type as AnimeType,
        episodes: malAnime.num_episodes,
        score: malAnime.mean,
        season: malAnime.start_season?.season,
        year: malAnime.start_season?.year,
        broadcast: `${malAnime.broadcast?.day_of_the_week} ${malAnime.broadcast?.start_time}`,
        ...(animeLibrary.find(({ malId }) => malAnime.id === malId) ?? {})
      }

      return returnedAnime
    },
    [animeLibrary]
  )

  return { mappedMALAnime }
}

export default useMyAnimeListMapper
