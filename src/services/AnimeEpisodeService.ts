import { type AnimeEpisodeDTO } from "@/interfaces/services/AnimeEpisodeService/AnimeEpisodeDTO"
import api from "./api"
import { get } from "./request/request"

const AnimeEpisodeService = {
  getAll: async (malId: number) => await get<AnimeEpisodeDTO[]>(api.animeEpisode.getAll(malId))
}

export default AnimeEpisodeService
