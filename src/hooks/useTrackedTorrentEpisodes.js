import { useEffect, useState } from "react";
import AnimeTorrentEpisodeService from "services/AnimeTorrentEpisodeService";
import { formatByteSize, getBytesSize } from "utils/byteSize";

const useTrackedTorrentEpisodes = malId => {
  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const addSize = row => {
    const torrentSizeSplit = row.torrentSize.split(" ");
    const byteSize = getBytesSize(...torrentSizeSplit);
    const displaySize = formatByteSize(...torrentSizeSplit);

    return { ...row, byteSize, displaySize };
  };

  useEffect(() => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId).then(trackedEpisodes => {
      setEpisodes(trackedEpisodes.map(episode => addSize(episode)));
      setIsFetching(false);
    });
  }, []);

  const patchTrackedAnimeEpisode = animeEpisodeTorrent =>
    AnimeTorrentEpisodeService.replaceEpisodeTorrent(malId, animeEpisodeTorrent).then(updatedEpisode =>
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        addSize(updatedEpisode)
      ])
    );

  const scanEpisodes = () => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.scanEpisodeTorrent(malId)
      .then(episodes =>
        setEpisodes(currentEpisodes => [...currentEpisodes, ...episodes.map(episode => addSize(episode))])
      )
      .finally(() => setIsFetching(false));
  };

  const searchPack = () => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.scanPackTorrent(malId)
      .then(episode => setEpisodes(currentEpisodes => [...currentEpisodes, addSize(episode)]))
      .finally(() => setIsFetching(false));
  };

  return { episodes, isFetching, scanEpisodes, patchTrackedAnimeEpisode, searchPack };
};

export default useTrackedTorrentEpisodes;
