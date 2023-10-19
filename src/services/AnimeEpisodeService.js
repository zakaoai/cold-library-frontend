import { API_BASE_URL } from "@/constants/config";
import { get } from "./request/request";

const path = malId => `${API_BASE_URL}/anime/${malId}/episodes`;

const AnimeEpisodeService = {
  getAll: malId =>
    get(path(malId)).catch(a => {
      console.error("Erreur de récupération des épisodes", a);
      throw a;
    })
};

export default AnimeEpisodeService;
