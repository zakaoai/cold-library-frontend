import { useEffect, useState } from "react";
import AnimeTorrentEpisodeService from "~/services/AnimeTorrentEpisodeService";

const useTrackedTorrentEpisodes = malId => {
  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId).then(data => {
      setEpisodes(data);
      setIsFetching(false);
    });
  }, []);

  const patchTrackedAnimeEpisode = animeEpisodeTorrent =>
    AnimeTorrentEpisodeService.replaceEpisodeTorrent(malId, animeEpisodeTorrent).then(updatedEpisode =>
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        updatedEpisode
      ])
    );

  const scanEpisodes = () => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.scanEpisodeTorrent(malId)
      .then(episodes => setEpisodes(currentEpisodes => [...currentEpisodes, ...episodes]))
      .finally(() => setIsFetching(false));
  };

  return { episodes, isFetching, scanEpisodes, patchTrackedAnimeEpisode };
};

export default useTrackedTorrentEpisodes;
