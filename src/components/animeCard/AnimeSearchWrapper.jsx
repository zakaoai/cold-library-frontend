import React from "react";
import AnimeCardComponent from "./AnimeCardComponent";
import AnimeServices from "~/services/AnimeServices";

export default function AnimeSearchWrapper({ anime, updateAnime }) {
  const { malId, title, url, imageUrl, type, nbEpisodes } = anime;
  const defaultAnime = { malId, title, url, imageUrl, type, nbEpisodes };
  const setLastAvaibleEpisode = LastAvaibleEpisode =>
    AnimeServices.updateLastAvaibleEpisode(malId, LastAvaibleEpisode).then(updatedAnime => updateAnime(updatedAnime));
  const setIsComplete = isComplete =>
    AnimeServices.updateIsComplete(malId, isComplete).then(updatedAnime => updateAnime(updatedAnime));
  const setStorageState = storageState =>
    AnimeServices.updateStorageState(malId, storageState).then(updatedAnime => updateAnime(updatedAnime));

  const deleteAnime = () => AnimeServices.delete(malId).then(() => updateAnime(defaultAnime));

  const saveAnime = () => AnimeServices.saveInLibrary(malId).then(updatedAnime => updateAnime(updatedAnime));

  const updateAnimeState = { setLastAvaibleEpisode, setIsComplete, setStorageState, deleteAnime, saveAnime };

  return <AnimeCardComponent anime={anime} showEpisodeLink updateAnimeState={updateAnimeState} />;
}
