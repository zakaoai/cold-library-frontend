import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";

export default function useAnimeLibrary(malId = undefined) {
  const [reload, setReload] = useState(false);
  const [anime, setAnime] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [swapStorageState, setDoSwapStorageState] = useState(false);
  const [swapIsComplete, setDoSwapIsComplete] = useState(false);
  const [lastAvaibleEpisode, setLastAvaibleEpisode] = useState(undefined);

  useEffect(() => {
    if (malId != undefined) {
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

  const deleteAnime = () => {
    AnimeServices.delete(malId).then(() => doFetch());
  };

  useEffect(() => {
    if (anime != undefined) {
      let storageState = "";
      if (anime.storageState === "FLUX_CHAUD") {
        storageState = "FLUX_FROID";
      } else {
        storageState = "FLUX_CHAUD";
      }
      AnimeServices.updateStorageState(malId, storageState).then(() => doFetch());
    }
  }, [swapStorageState]);

  useEffect(() => {
    if (anime != undefined) {
      AnimeServices.updateIsComplete(malId, !anime.isComplete).then(() => doFetch());
    }
  }, [swapIsComplete]);

  useEffect(() => {
    if (anime != undefined && lastAvaibleEpisode != undefined) {
      AnimeServices.updateLastAvaibleEpisode(malId, lastAvaibleEpisode).then(() => doFetch());
    }
  }, [lastAvaibleEpisode]);

  const doSwapStorageState = () => setDoSwapStorageState(a => !a);
  const doSwapIsComplete = () => setDoSwapIsComplete(a => !a);

  return {
    anime,
    isFetching,
    doFetch,
    saveAnime,
    deleteAnime,
    doSwapStorageState,
    doSwapIsComplete,
    setLastAvaibleEpisode
  };
}
