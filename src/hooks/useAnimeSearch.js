import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AnimeServices from "services/AnimeServices";
import SiteMap from "routes/SiteMap";

export default function useAnimeSearch(initialSearch = "") {
  const navigate = useNavigate();
  const [search, setSearch] = useState(initialSearch);
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (search != "" && search != undefined) {
      setIsFetching(true);
      navigate({ pathname: SiteMap.RECHERCHE.path, search: `?search=${search}` });

      AnimeServices.searchAnime(search)
        .then(data => {
          if (data.error) {
            setError(data.error);
            setAnimes([]);
          } else {
            setAnimes(data);
          }
        })
        .finally(() => setIsFetching(false));
    }
  }, [search]);

  const updateAnime = updatedAnime =>
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    );

  return { animes, error, isFetching, setSearch, updateAnime };
}
