import { type TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO"

import api from "./api"
import { deleteRequest, get, patch, post } from "./request/request"

const TrackedAnimeTorrentService = {
  getAll: async () => await get<TrackedAnimeTorrentDTO[]>(api.trackedAnimeTorrent.getAll),
  get: async (malId: number) => await get<TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.get(malId)),
  update: async (malId: number, trackedAnime: TrackedAnimeTorrentDTO) =>
    await patch<TrackedAnimeTorrentDTO, TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.update(malId), trackedAnime),
  delete: async (malId: number) => await deleteRequest(api.trackedAnimeTorrent.delete(malId)),
  saveInLibrary: async (malId: number) =>
    await post<undefined, TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.saveInLibrary(malId), undefined)
}

export default TrackedAnimeTorrentService
