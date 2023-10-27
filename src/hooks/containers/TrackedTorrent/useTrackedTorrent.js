import AnimeServices from "@/services/AnimeService";
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService";
import { useCallback, useEffect, useState } from "react";

export default function useTrackedTorrent() {
  const [trackedTorrents, setTrackedTorrents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getAnimeInfo(trackedTorrent) {
      const { malId } = trackedTorrent;

      const animeInfos = await AnimeServices.get(malId);

      return { ...trackedTorrent, ...animeInfos };
    }

    setIsFetching(true);
    TrackedAnimeTorrentService.getAll()
      .then(async data => {
        const mappedData = await Promise.all(data.map(async trackedTorrent => await getAnimeInfo(trackedTorrent)));
        setTrackedTorrents(mappedData);
      })
      .finally(() => setIsFetching(false));
  }, []);

  const updateTrackedAnime = useCallback(
    updatedTrackedAnime =>
      setTrackedTorrents(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
        )
      ),
    [setTrackedTorrents]
  );

  return { trackedTorrents, isFetching, updateTrackedAnime };
}
