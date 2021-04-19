import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";
import TrackedAnimeTorrentService from "~/services/TrackedAnimeTorrentService";

export default function useLibrary() {
  const [doReload, setDoReload] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeServices.getAll()
      .then(async animes => {
        const trackedAnimes = await TrackedAnimeTorrentService.getAll();
        return animes.map(anime =>
          trackedAnimes.some(trackedAnime => trackedAnime.malId === anime.malId)
            ? { ...anime, trackedTorrent: true }
            : anime
        );
      })
      .then(data => setAnimes(data))
      .finally(() => setIsFetching(false));
  }, [doReload]);

  const doFetch = () => setDoReload(a => !a);

  const updateAnime = updatedAnime =>
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    );

  return { animes, isFetching, doFetch, updateAnime };
}
