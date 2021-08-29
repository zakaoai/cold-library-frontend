import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";

export default function useAnimeSearch(initialSearch = "") {
  const [search, setSearch] = useState(initialSearch);
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (search != "" && search != undefined) {
      setIsFetching(true);
      AnimeServices.searchAnime(search)
        .then(data => setAnimes(data))
        .finally(() => setIsFetching(false));
    }
  }, [search]);

  const updateAnime = updatedAnime =>
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    );

  return { animes, isFetching, setSearch, updateAnime };
}
