import { API_BASE_URL } from "@/constants/config"

const api = {
  animeEpisode: {
    getAll: (malId: number) => `${API_BASE_URL}/anime/${malId}/episodes`
  },
  anime: {
    getAll: `${API_BASE_URL}/anime`,
    get: (malId: number) => `${API_BASE_URL}/anime/${malId}`,
    search: (search: string) => `${API_BASE_URL}/anime/search/${search}`,
    delete: (malId: number) => `${API_BASE_URL}/anime/${malId}`,
    saveInLibrary: (malId: number) => `${API_BASE_URL}/anime/${malId}`,
    updateStorageState: (malId: number) => `${API_BASE_URL}/anime/${malId}/storage_state`,
    updateLastAvaibleEpisode: (malId: number) => `${API_BASE_URL}/anime/${malId}/last_avaible_episode`,
    updateIsComplete: (malId: number) => `${API_BASE_URL}/anime/${malId}/is_complete`,
    updateIsDownloading: (malId: number) => `${API_BASE_URL}/anime/${malId}/is_downloading`,
    update: (malId: number) => `${API_BASE_URL}/anime/${malId}/update`
  },
  animeTorrentEpisode: {
    getAnimeEpisodesTorrents: (malId: number) => `${API_BASE_URL}/torrent/${malId}/episodes`,
    searchAlternateEpisodeTorrent: (malId: number, episodeNumber: number) =>
      `${API_BASE_URL}/torrent/${malId}/episodes/${episodeNumber}/alternate`,
    replaceEpisodeTorrent: (malId: number, episodeNumber: number) =>
      `${API_BASE_URL}/torrent/${malId}/episodes/${episodeNumber}`,
    scanEpisodeTorrent: (malId: number) => `${API_BASE_URL}/torrent/${malId}/episodes/scan`,
    scanPackTorrent: (malId: number) => `${API_BASE_URL}/torrent/${malId}/episodes/scanPack`,
    scanNextEpisodeTorrent: (malId: number) => `${API_BASE_URL}/torrent/${malId}/episodes/scanNext`,
    deleteTorrent: (malId: number, episodeNumber: number) =>
      `${API_BASE_URL}/torrent/${malId}/episodes/${episodeNumber}`,
    updateTorrent: (malId: number, episodeNumber: number) =>
      `${API_BASE_URL}/torrent/${malId}/episodes/${episodeNumber}/update`
  },
  animeTorrent: {
    getAll: `${API_BASE_URL}/torrent`,
    get: (malId: number) => `${API_BASE_URL}/torrent/${malId}`,
    update: (malId: number) => `${API_BASE_URL}/torrent/${malId}`,
    delete: (malId: number) => `${API_BASE_URL}/torrent/${malId}`,
    saveInLibrary: (malId: number) => `${API_BASE_URL}/torrent/${malId}`
  }
}

export default api
