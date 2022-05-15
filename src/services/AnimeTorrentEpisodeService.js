import { API_BASE_URL } from "constants/config";

const path = malId => `${API_BASE_URL}/torrent/${malId}/episodes`;
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

const AnimeTorrentEpisodeService = {
  getAnimeEpisodesTorrents: malId => {
    return fetch(path(malId), getOptions).then(data => data.json());
  },
  searchAlternateEpisodeTorrent: (malId, episodeNumber) => {
    const url = `${path(malId)}/${episodeNumber}/alternate`;
    return fetch(url, getOptions).then(data => data.json());
  },
  replaceEpisodeTorrent: (malId, animeEpisodeTorrent) => {
    const { episodeNumber } = animeEpisodeTorrent;
    const url = `${path(malId)}/${episodeNumber}`;
    return fetch(url, putOptions(JSON.stringify(animeEpisodeTorrent))).then(data => data.json());
  },
  scanEpisodeTorrent: malId => {
    const url = `${path(malId)}/scan`;
    return fetch(url, getOptions).then(data => data.json());
  },
  scanPackTorrent: malId => {
    const url = `${path(malId)}/scanPack`;
    return fetch(url, getOptions).then(data => data.json());
  },
  scanNextEpisodeTorrent: malId => {
    const url = `${path(malId)}/scanNext`;
    return fetch(url, getOptions).then(data => data.json());
  },
  deleteTorrent: (malId, episodeNumber) => {
    const url = `${path(malId)}/${episodeNumber}`;
    return fetch(url, deleteOptions);
  }
};

export default AnimeTorrentEpisodeService;
