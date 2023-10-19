import { API_BASE_URL } from "@/constants/config";

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
    update: (malId: number) => `${API_BASE_URL}/anime/${malId}/update`
  }
};

export default api;
