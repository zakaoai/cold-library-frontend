import React from "react";
import AnimeCardComponent from "./AnimeCardComponent";
import AnimeServices from "~/services/AnimeServices";

export default function AnimeLibraryWrapper({ anime, updateAnime }) {
  const { malId } = anime;
  const setLastAvaibleEpisode = LastAvaibleEpisode =>
    AnimeServices.updateLastAvaibleEpisode(malId, LastAvaibleEpisode).then(updatedAnime => updateAnime(updatedAnime));
  const setIsComplete = isComplete =>
    AnimeServices.updateIsComplete(malId, isComplete).then(updatedAnime => updateAnime(updatedAnime));
  const setStorageState = storageState =>
    AnimeServices.updateStorageState(malId, storageState).then(updatedAnime => updateAnime(updatedAnime));

  const deleteAnime = () => AnimeServices.delete(malId).then(() => updateAnime(undefined));

  const updateAnimeState = { setLastAvaibleEpisode, setIsComplete, setStorageState, deleteAnime };

  return <AnimeCardComponent anime={anime} showEpisodeLink updateAnimeState={updateAnimeState} />;
}
