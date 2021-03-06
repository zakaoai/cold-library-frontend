import React from "react";
import AnimeCardComponent from "./AnimeCardComponent";
import updateAnimeState from "./UpdateAnimeState";

export default function AnimeWrapper({ anime, updateAnime, ...others }) {
  const { malId, title, url, imageUrl, type, nbEpisodes } = anime;
  const defaultAnime = { malId, title, url, imageUrl, type, nbEpisodes };

  return (
    <AnimeCardComponent
      anime={anime}
      updateAnimeState={updateAnimeState(malId, defaultAnime, updateAnime)}
      {...others}
    />
  );
}
