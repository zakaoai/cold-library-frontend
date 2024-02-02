import useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"

export default interface AnimeCardContext {
  anime: AnimeDTO
  showEpisodeLink: boolean
  imageHeight: string
  showAddOrRemoveFromLibrary: boolean
  updateAnimeState: ReturnType<typeof useUpdateAnimeState>
}
