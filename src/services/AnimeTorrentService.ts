import { type AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"

import api from "./api"
import { deleteRequest, get, patch, post, put } from "./request/request"

const AnimeTorrentService = {
  getAll: async () => await get<AnimeTorrentDTO[]>(api.animeTorrent.getAll),
  get: async (malId: number) => await get<AnimeTorrentDTO>(api.animeTorrent.get(malId)),
  update: async (malId: number, trackedAnime: AnimeTorrentDTO) =>
    await patch<AnimeTorrentDTO, AnimeTorrentDTO>(api.animeTorrent.update(malId), trackedAnime),
  delete: async (malId: number) => await deleteRequest(api.animeTorrent.delete(malId)),
  saveInLibrary: async (malId: number) =>
    await post<undefined, AnimeTorrentDTO>(api.animeTorrent.saveInLibrary(malId), undefined),
  updateLastEpisodeOnServer: async (malId: number, LastEpisodeOnServer: number) =>
    put<number, AnimeTorrentDTO>(api.animeTorrent.updateLastEpisodeOnServer(malId), LastEpisodeOnServer)
}

export default AnimeTorrentService
