import React, { useEffect } from "react";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import AnimeCardComponent from "./AnimeCardComponent";

export default function AnimeLibraryWrapper({ malId, storageState, updateAnime }) {
  const {
    anime,
    isFetching,
    doFetch,
    saveAnime,
    deleteAnime,
    doSwapStorageState,
    doSwapIsComplete,
    setLastAvaibleEpisode
  } = useAnimeLibrary(malId, updateAnime);

  return (
    <AnimeCardComponent
      anime={anime}
      showEpisodeLink
      updateAnimeState={{ deleteAnime, saveAnime, doSwapIsComplete, doSwapStorageState, setLastAvaibleEpisode }}
    />
  );
}
