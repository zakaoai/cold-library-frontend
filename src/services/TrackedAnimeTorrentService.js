import { API_BASE_URL } from "constants/config";

const path = `${API_BASE_URL}/torrent`;
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
const patchOption = body => ({
  headers,
  method: "PATCH",
  body
});
const putOptions = body => ({
  headers,
  method: "PUT",
  body
});

const TrackedAnimeTorrentService = {
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
  update: (malId, trackedAnime) => {
    const { searchWords, dayOfRelease, lastEpisodeOnServer } = trackedAnime;
    const urlSearch = `${path}/${malId}`;
    return fetch(
      urlSearch,
      patchOption(JSON.stringify({ malId, searchWords, dayOfRelease, lastEpisodeOnServer }))
    ).then(data => {
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
  }
};

export default TrackedAnimeTorrentService;
