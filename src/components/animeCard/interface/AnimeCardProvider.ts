import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"

export default interface AnimeCardProvider {
  anime: AnimeDTO
  updateAnime: (updatedAnime: Partial<AnimeDTO> & Pick<AnimeDTO, "malId">) => void
  showEpisodeLink: boolean
  imageHeight: string
  showAddOrRemoveFromLibrary: boolean
}
