import React from "react";
import AnimeCardLink from "./AnimeCardLink";
import AnimeCardTrackedButton from "./AnimeCardTrackedButton";

function AnimeCardHeaderActions({ showEpisodeLink, malId, isInLibrary, isAnimeTracked, trackAnime, unTrackAnime }) {
  return (
    <>
      {isInLibrary && (
        <AnimeCardTrackedButton isAnimeTracked={isAnimeTracked} trackAnime={trackAnime} unTrackAnime={unTrackAnime} />
      )}
      {showEpisodeLink && <AnimeCardLink malId={malId} />}
    </>
  );
}

export default AnimeCardHeaderActions;
