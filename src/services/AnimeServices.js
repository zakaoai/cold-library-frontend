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
  },
  getAllLibrary: () => {
    const urlSearch = `${path}/animeRepo`;

    const options = {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      mode: "cors"
    };

    return fetch(urlSearch, options).then(data => {
      return data.json();
    });
  },
  findInLibraryByMalId: malId => {
    const urlSearch = `${path}/anime/${malId}`;

    const options = {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      mode: "cors"
    };

    return fetch(urlSearch, options).then(data => {
      if (!data.ok && data.status === 404) return undefined;
      return data.json();
    });
  },
  saveInLibrary: malId => {
    const urlSearch = `${path}/anime/save/${malId}`;

    const options = {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      mode: "cors"
    };

    return fetch(urlSearch, options).then(data => data.json());
  },
  deleteFromLibrary: malId => {
    const urlSearch = `${path}/anime/delete/${malId}`;

    const options = {
      headers: {
        Accept: "*/*"
      },
      method: "DELETE",
      mode: "cors"
    };

    return fetch(urlSearch, options).then(data => {
      if (data.ok && data.status === 204) return undefined;
      else throw Error("Erreur de suppression");
    });
  }
};

export default AnimeServices;
