import React from "react";
import AnimeCardLink from "./AnimeCardLink";

function AnimeCardHeaderActions({ showEpisodeLink, malId }) {
  return (showEpisodeLink && <AnimeCardLink malId={malId} />) || null;
}

export default AnimeCardHeaderActions;
