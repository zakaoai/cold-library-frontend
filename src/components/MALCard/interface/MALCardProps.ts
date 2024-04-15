import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"

export default interface MALCardProps {
  malAnime: Omit<MALAnime, "broadcast"> & AnimeDTO
}
