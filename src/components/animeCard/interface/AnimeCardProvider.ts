import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"

export default interface AnimeCardProvider {
  anime: AnimeDTO
  updateAnime: (updatedAnime: AnimeDTO | AnimeInServerDTO) => void
  showEpisodeLink?: boolean
  imageHeight?: string
  showAddOrRemoveFromLibrary?: boolean
}
