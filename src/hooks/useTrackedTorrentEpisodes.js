import AnimeTorrentEpisodeService from "@/services/AnimeTorrentEpisodeService";
import { formatEpisode } from "@/utils/torrentEpisode";
import { useCallback, useEffect, useState } from "react";

const useTrackedTorrentEpisodes = (malId, lastEpisodeOnServer) => {
  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId).then(trackedEpisodes => {
      setEpisodes(trackedEpisodes.map(episode => formatEpisode(episode)));
      setIsFetching(false);
    });
  }, []);

  const patchTrackedAnimeEpisode = useCallback(
    animeEpisodeTorrent => {
      if (!isFetching) {
        setIsFetching(true);
        AnimeTorrentEpisodeService.replaceEpisodeTorrent(malId, animeEpisodeTorrent)
          .then(updatedEpisode =>
            setEpisodes(episodes => [
              ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
              formatEpisode(updatedEpisode)
            ])
          )
          .finally(() => setIsFetching(false));
      }
    },
    [isFetching, setEpisodes, setIsFetching]
  );

  const scanEpisodes = useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);
      AnimeTorrentEpisodeService.scanEpisodeTorrent(malId)
        .then(episodes =>
          setEpisodes(currentEpisodes => [...currentEpisodes, ...episodes.map(episode => formatEpisode(episode))])
        )
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, setEpisodes, setIsFetching]);

  const searchPack = useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);
      AnimeTorrentEpisodeService.scanPackTorrent(malId)
        .then(episode => setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(episode)]))
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, setEpisodes, setIsFetching]);

  const deleteTorrent = useCallback(
    episodeNumber => {
      if (!isFetching) {
        setIsFetching(true);
        AnimeTorrentEpisodeService.deleteTorrent(malId, episodeNumber)
          .then(() => setEpisodes(episodes => episodes.filter(ep => ep.episodeNumber !== episodeNumber)))
          .finally(() => setIsFetching(false));
      }
    },
    [isFetching, setEpisodes, setIsFetching]
  );

  const scanNextEpisode = useCallback(() => {
    if (
      episodes.length === 0 ||
      episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)[episodes.length - 1].episodeNumber ===
        lastEpisodeOnServer
    ) {
      setIsFetching(true);
      AnimeTorrentEpisodeService.scanNextEpisodeTorrent(malId)
        .then(episode => episode && setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(episode)]))
        .finally(() => setIsFetching(false));
    }
  }, [lastEpisodeOnServer, episodes, setEpisodes, setIsFetching]);

  return {
    episodes,
    isFetching,
    scanEpisodes,
    scanNextEpisode,
    patchTrackedAnimeEpisode,
    searchPack,
    deleteTorrent,
    setEpisodes
  };
};

export default useTrackedTorrentEpisodes;
