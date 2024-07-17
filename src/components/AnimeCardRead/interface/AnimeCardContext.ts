import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type { Anime } from "./Anime"

export default interface AnimeCardContext {
  anime: Anime & Partial<AnimeInServerDTO>
  showEpisodeLink: boolean
  imageHeight: string
}
