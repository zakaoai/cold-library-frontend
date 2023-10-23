import { AnimeEpisodeDTO } from "@/interfaces/services/AnimeEpisodeService/AnimeEpisodeDTO";
import api from "./api";
import { get } from "./request/request";

const AnimeEpisodeService = {
  getAll: (malId: number) => get<AnimeEpisodeDTO[]>(api.animeEpisode.getAll(malId))
};

export default AnimeEpisodeService;
