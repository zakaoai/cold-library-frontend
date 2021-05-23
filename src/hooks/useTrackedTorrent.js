import { useState, useEffect } from "react";
import AnimeServices from "~/services/AnimeServices";
import AnimeTorrentEpisodeService from "~/services/AnimeTorrentEpisodeService";
import TrackedAnimeTorrentService from "~/services/TrackedAnimeTorrentService";

export default function useTrackedTorrent() {
  const [doReload, setDoReload] = useState(false);
  const [trackedTorrents, setTrackedTorrents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getEpisodes(trackedTorrent) {
      const { malId } = trackedTorrent;
      const promiseAnime = AnimeServices.get(malId);
      const promiseTorrentEp = AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId);
      const promiseDatas = await Promise.all([promiseAnime, promiseTorrentEp]).then(data => data);

      return { ...trackedTorrent, ...promiseDatas[0], torrents: promiseDatas[1] };
    }

    setIsFetching(true);
    TrackedAnimeTorrentService.getAll()
      .then(async data => {
        const mappedData = await Promise.all(data.map(async trackedTorrent => await getEpisodes(trackedTorrent)));
        setTrackedTorrents(mappedData);
      })
      .finally(() => setIsFetching(false));
  }, [doReload]);

  const doFetch = () => setDoReload(a => !a);

  const updateTrackedAnime = updatedTrackedAnime =>
    setTrackedTorrents(trackedAnimes =>
      trackedAnimes.map(trackedAnime =>
        trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
      )
    );

  const sortByEpisodeNumber = (epA, epB) => {
    return epA.episodeNumber - epB.episodeNumber;
  };

  const updateEpisodeTrackedAnime = updatedEpisode =>
    setTrackedTorrents(trackedAnimes =>
      trackedAnimes.map(trackedAnime =>
        trackedAnime.malId === updatedEpisode.malId
          ? {
              ...trackedAnime,
              torrents: [
                ...trackedAnime.torrents.filter(e => e.episodeNumber !== updatedEpisode.episodeNumber),
                updatedEpisode
              ].sort(sortByEpisodeNumber)
            }
          : trackedAnime
      )
    );

  const scanAnime = malId => {
    AnimeTorrentEpisodeService.scanEpisodeTorrent(malId).then(episodes =>
      setTrackedTorrents(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === malId
            ? { ...trackedAnime, torrents: [...trackedAnime.torrents, ...episodes] }
            : trackedAnime
        )
      )
    );
  };

  return { trackedTorrents, isFetching, doFetch, updateTrackedAnime, scanAnime, updateEpisodeTrackedAnime };
}
