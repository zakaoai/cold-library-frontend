const path = "http://localhost:9000";

const AnimeServices = {
  searchAnime: search => {
    const urlSearch = `${path}/anime/search/${search}`;

    const options = {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      mode: "cors"
    };

    return fetch(urlSearch, options).then(data => data.json());
  }
};

export default AnimeServices;
