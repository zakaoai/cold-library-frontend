import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"

export default interface AnimeCardProvider {
  anime: AnimeDTO
  showEpisodeLink?: boolean
  imageHeight?: string
}
