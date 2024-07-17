import StorageState from "@/enums/StorageState"
import useUpdateAnimeStorageState from "@/hooks/components/useUpdateAnimeStorageState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import { useCallback, type Dispatch, type SetStateAction } from "react"

const useUpdateAnimeListState = <T extends AnimeDTO | AnimeInServerDTO>(
  setMyAnimeList: Dispatch<SetStateAction<T[]>>
) => {
  const callBack = useCallback(
    (anime: AnimeDTO | AnimeInServerDTO) => {
      const { storageState } = anime
      if (storageState === undefined) {
        setMyAnimeList(prev =>
          prev.map(prevAnime => (prevAnime.malId === anime.malId ? { ...prevAnime, ...anime } : prevAnime))
        )
      }
      if (storageState === StorageState.FLUX_FROID) {
        setMyAnimeList(prev =>
          prev.map(prevAnime => (prevAnime.malId === anime.malId ? { ...prevAnime, ...anime } : prevAnime))
        )
      }
      if (storageState === StorageState.FLUX_CHAUD) {
        setMyAnimeList(prev =>
          prev.map(prevAnime => (prevAnime.malId === anime.malId ? { ...prevAnime, ...anime } : prevAnime))
        )
      }
    },
    [setMyAnimeList]
  )

  const { updateAnime } = useUpdateAnimeStorageState(callBack)

  return { updateAnime }
}

export default useUpdateAnimeListState
