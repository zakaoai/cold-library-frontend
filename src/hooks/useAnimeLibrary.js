import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";

export default function useAnimeLibrary(malId = undefined) {
  const [reload, setReload] = useState(false);
  const [anime, setAnime] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);

  console.log(anime);

  useEffect(() => {
    if (malId != undefined) {
      setIsFetching(true);
      AnimeServices.findInLibraryByMalId(malId)
        .then(data => setAnime(data))
        .finally(() => setIsFetching(false));
    }
  }, [malId, reload]);

  const doFetch = () => setReload(a => !a);

  const saveAnime = () => {
    AnimeServices.saveInLibrary(malId).then(() => doFetch());
  };

  const deleteAnime = () => {
    AnimeServices.deleteFromLibrary(malId).then(() => doFetch());
  };

  return { anime, isFetching, doFetch, saveAnime, deleteAnime };
}
