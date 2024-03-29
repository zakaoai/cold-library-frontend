import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import api from "./api"
import { deleteRequest, get, post, put } from "./request/request"

const AnimeServices = {
  searchAnime: async (search: string) => await get<AnimeDTO[]>(api.anime.search(search)),
  getAll: async () => await get<AnimeDTO[]>(api.anime.getAll),
  get: async (malId: number) => await get<AnimeDTO>(api.anime.get(malId)),
  delete: async (malId: number) => await deleteRequest(api.anime.delete(malId)),
  saveInLibrary: async (malId: number) => await post<undefined, AnimeDTO>(api.anime.saveInLibrary(malId), undefined),
  updateStorageState: async (malId: number, state: string) =>
    await put<string, AnimeInServerDTO>(api.anime.updateStorageState(malId), state),
  updateLastAvaibleEpisode: async (malId: number, lastAvaibleEpisode: number) =>
    await put<number, AnimeInServerDTO>(api.anime.updateLastAvaibleEpisode(malId), lastAvaibleEpisode),
  updateIsComplete: async (malId: number, isComplete: boolean) =>
    await put<boolean, AnimeInServerDTO>(api.anime.updateIsComplete(malId), isComplete),
  updateIsDownloading: async (malId: number, isComplete: boolean) =>
    await put<boolean, AnimeInServerDTO>(api.anime.updateIsDownloading(malId), isComplete),
  update: async (malId: number) => await get<AnimeDTO>(api.anime.update(malId))
}

export default AnimeServices
