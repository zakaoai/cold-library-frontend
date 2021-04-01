import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";

export default function useAnimeLibrary(malId) {
  const [reload, setReload] = useState(false);
  const [anime, setAnime] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (malId != undefined && !isFetching) {
      setIsFetching(true);
      AnimeServices.get(malId)
        .then(data => setAnime(data))
        .finally(() => setIsFetching(false));
    }
  }, [malId, reload]);

  const doFetch = () => setReload(a => !a);

  const saveAnime = () => {
    AnimeServices.saveInLibrary(malId).then(() => doFetch());
  };

  const deleteAnime = () => AnimeServices.delete(malId).then(() => setAnime(undefined));

  const setLastAvaibleEpisode = LastAvaibleEpisode =>
    AnimeServices.updateLastAvaibleEpisode(malId, LastAvaibleEpisode).then(updatedAnime => setAnime(updatedAnime));
  const setIsComplete = isComplete =>
    AnimeServices.updateIsComplete(malId, isComplete).then(updatedAnime => setAnime(updatedAnime));
  const setStorageState = storageState =>
    AnimeServices.updateStorageState(malId, storageState).then(updatedAnime => setAnime(updatedAnime));

  return {
    anime,
    isFetching,
    updateAnimeState: {
      saveAnime,
      deleteAnime,
      setIsComplete,
      setStorageState,
      setLastAvaibleEpisode
    },
    doFetch
  };
}
