import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO";
import api from "./api";
import { deleteRequest, get, post, put } from "./request/request";

const AnimeServices = {
  searchAnime: (search: string) => get<AnimeDTO[]>(api.anime.search(search)),
  getAll: () => get<AnimeDTO[]>(api.anime.getAll),
  get: (malId: number) => get<AnimeDTO>(api.anime.get(malId)),
  delete: (malId: number) => deleteRequest(api.anime.delete(malId)),
  saveInLibrary: (malId: number) => post<undefined, AnimeDTO>(api.anime.saveInLibrary(malId), undefined),
  updateStorageState: (malId: number, state: string) =>
    put<string, AnimeDTO>(api.anime.updateStorageState(malId), state),
  updateLastAvaibleEpisode: (malId: number, lastAvaibleEpisode: string) =>
    put<string, AnimeDTO>(api.anime.updateLastAvaibleEpisode(malId), lastAvaibleEpisode),
  updateIsComplete: (malId: number, isComplete: boolean) =>
    put<boolean, AnimeDTO>(api.anime.updateIsComplete(malId), isComplete),
  update: (malId: number) => get<AnimeDTO>(api.anime.update(malId))
};

export default AnimeServices;
