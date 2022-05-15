import { useEffect, useState } from "react";
import AnimeTorrentEpisodeService from "services/AnimeTorrentEpisodeService";
import { formatByteSize, getBytesSize } from "utils/byteSize";

const useTrackedTorrentEpisodes = malId => {
  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const formatEpisode = ep => {
    const torrentSizeSplit = ep.torrentSize.split(" ");
    const byteSize = getBytesSize(...torrentSizeSplit);
    const displaySize = formatByteSize(...torrentSizeSplit);

    return { ...ep, byteSize, displaySize, date: new Date(ep.date) };
  };

  useEffect(() => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId).then(trackedEpisodes => {
      setEpisodes(trackedEpisodes.map(episode => formatEpisode(episode)));
      setIsFetching(false);
    });
  }, []);

  const patchTrackedAnimeEpisode = animeEpisodeTorrent =>
    AnimeTorrentEpisodeService.replaceEpisodeTorrent(malId, animeEpisodeTorrent).then(updatedEpisode =>
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        formatEpisode(updatedEpisode)
      ])
    );

  const scanEpisodes = () => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.scanEpisodeTorrent(malId)
      .then(episodes =>
        setEpisodes(currentEpisodes => [...currentEpisodes, ...episodes.map(episode => formatEpisode(episode))])
      )
      .finally(() => setIsFetching(false));
  };

  const searchPack = () => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.scanPackTorrent(malId)
      .then(episode => setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(episode)]))
      .finally(() => setIsFetching(false));
  };

  const deleteTorrent = episodeNumber => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.deleteTorrent(malId, episodeNumber)
      .then(() => setEpisodes(episodes => episodes.filter(ep => ep.episodeNumber !== episodeNumber)))
      .finally(() => setIsFetching(false));
  };

  return { episodes, isFetching, scanEpisodes, patchTrackedAnimeEpisode, searchPack, deleteTorrent };
};

export default useTrackedTorrentEpisodes;
