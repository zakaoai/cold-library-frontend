import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";

export default function useLibrary() {
  const [doReload, setDoReload] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeServices.getAll()
      .then(data => setAnimes(data))
      .finally(() => setIsFetching(false));
  }, [doReload]);

  const doFetch = () => setDoReload(a => !a);

  return { animes, isFetching, doFetch };
}
