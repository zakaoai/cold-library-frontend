import { type TrackedAnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"

import api from "./api"
import { deleteRequest, get, patch, post } from "./request/request"

const AnimeTorrentService = {
  getAll: async () => await get<TrackedAnimeTorrentDTO[]>(api.animeTorrent.getAll),
  get: async (malId: number) => await get<TrackedAnimeTorrentDTO>(api.animeTorrent.get(malId)),
  update: async (malId: number, trackedAnime: TrackedAnimeTorrentDTO) =>
    await patch<TrackedAnimeTorrentDTO, TrackedAnimeTorrentDTO>(api.animeTorrent.update(malId), trackedAnime),
  delete: async (malId: number) => await deleteRequest(api.animeTorrent.delete(malId)),
  saveInLibrary: async (malId: number) =>
    await post<undefined, TrackedAnimeTorrentDTO>(api.animeTorrent.saveInLibrary(malId), undefined)
}

export default AnimeTorrentService
