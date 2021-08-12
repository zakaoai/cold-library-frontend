import { useEffect, useState } from "react";
import AnimeTorrentEpisodeService from "~/services/AnimeTorrentEpisodeService";

const useTrackedTorrentEpisodes = malId => {
  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [doFetch, setDoFetch] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeTorrentEpisodeService.getAnimeEpisodesTorrents(malId).then(data => {
      setEpisodes(data);
      setIsFetching(false);
    });
  }, [doFetch]);

  const patchTrackedAnimeEpisode = animeEpisodeTorrent =>
    AnimeTorrentEpisodeService.replaceEpisodeTorrent(malId, animeEpisodeTorrent).then(updatedEpisode =>
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        updatedEpisode
      ])
    );

  return { episodes, isFetching, scanEpisodes: () => setDoFetch(a => !a), patchTrackedAnimeEpisode };
};

export default useTrackedTorrentEpisodes;
