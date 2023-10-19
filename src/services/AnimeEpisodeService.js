import api from "./api";
import { get } from "./request/request";

const AnimeEpisodeService = {
  getAll: malId =>
    get(api.animeEpisode.getAll(malId)).catch(a => {
      console.error("Erreur de récupération des épisodes", a);
      throw a;
    })
};

export default AnimeEpisodeService;
