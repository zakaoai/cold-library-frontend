import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"

export default interface MALAnimeAnimeDTO extends Omit<MALAnime, "broadcast" | "rank" | "status">, AnimeDTO {}
