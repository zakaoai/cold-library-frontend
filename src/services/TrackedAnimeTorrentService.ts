import { TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO";

import api from "./api";
import { deleteRequest, get, patch, post } from "./request/request";

const TrackedAnimeTorrentService = {
  getAll: () => get<TrackedAnimeTorrentDTO[]>(api.trackedAnimeTorrent.getAll),
  get: (malId: number) => get<TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.get(malId)),
  update: (malId: number, trackedAnime: TrackedAnimeTorrentDTO) =>
    patch<TrackedAnimeTorrentDTO, TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.update(malId), trackedAnime),
  delete: (malId: number) => deleteRequest(api.trackedAnimeTorrent.delete(malId)),
  saveInLibrary: (malId: number) =>
    post<undefined, TrackedAnimeTorrentDTO>(api.trackedAnimeTorrent.saveInLibrary(malId), undefined)
};

export default TrackedAnimeTorrentService;
