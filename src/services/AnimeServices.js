import { API_BASE_URL } from "~/constants/config";

const path = `${API_BASE_URL}/anime`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const getOptions = {
  headers,
  method: "GET"
};
const deleteOptions = {
  headers,
  method: "DELETE"
};
const postOptions = {
  headers,
  method: "POST"
};
const putOptions = body => ({
  headers,
  method: "PUT",
  body
});

const AnimeServices = {
  searchAnime: search => {
    const urlSearch = `${path}/search/${search}`;
    return fetch(urlSearch, getOptions).then(data => data.json());
  },
  getAll: () => {
    return fetch(path, getOptions).then(data => {
      return data.json();
    });
  },
  get: malId => {
    const urlSearch = `${path}/${malId}`;
    return fetch(urlSearch, getOptions).then(data => {
      if (!data.ok && data.status === 404) return undefined;
      return data.json();
    });
  },
  delete: malId => {
    const urlSearch = `${path}/${malId}`;
    return fetch(urlSearch, deleteOptions).then(data => {
      if (data.ok && data.status === 204) return undefined;
      else throw Error("Erreur de suppression");
    });
  },
  saveInLibrary: malId => {
    const urlSearch = `${path}/${malId}`;
    return fetch(urlSearch, postOptions).then(data => data.json());
  },
  updateStorageState: (malId, state) => {
    const urlSearch = `${path}/${malId}/storage_state`;
    return fetch(urlSearch, putOptions(state)).then(data => data.json());
  },
  updateLastAvaibleEpisode: (malId, lastAvaibleEpisode) => {
    const urlSearch = `${path}/${malId}/last_avaible_episode`;
    return fetch(urlSearch, putOptions(lastAvaibleEpisode)).then(data => data.json());
  },
  updateIsComplete: (malId, isComplete) => {
    const urlSearch = `${path}/${malId}/is_complete`;
    return fetch(urlSearch, putOptions(isComplete)).then(data => data.json());
  }
};

export default AnimeServices;
