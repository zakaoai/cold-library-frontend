import { API_BASE_URL } from "~/constants/config";

const path = malId => `${API_BASE_URL}/anime/${malId}/episodes`;
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

const AnimeEpisodeService = {
  getAll: malId => {
    return fetch(path(malId), getOptions).then(data => {
      return data.json();
    });
  }
};

export default AnimeEpisodeService;
