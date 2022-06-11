import { useState, useEffect, useCallback } from "react";
import AnimeServices from "services/AnimeServices";
import TrackedAnimeTorrentService from "services/TrackedAnimeTorrentService";

export default function useAnimeLibrary(malId) {
  const [anime, setAnime] = useState(undefined);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    const getAnime = AnimeServices.get(malId);
    const getTorrent = TrackedAnimeTorrentService.get(malId).catch(() => false);
    Promise.all([getAnime, getTorrent])
      .then(([anime, torrent]) => setAnime({ ...anime, trackedTorrent: !!torrent }))
      .finally(() => setIsFetching(false));
  }, [malId]);

  const updateAnime = updatedAnime => setAnime(anime => ({ ...anime, ...updatedAnime }));

  const updateAnimeInfos = useCallback(() => {
    AnimeServices.update(malId).then(updateAnime);
  }, []);

  return {
    anime,
    isFetching,
    updateAnime,
    updateAnimeInfos
  };
}
