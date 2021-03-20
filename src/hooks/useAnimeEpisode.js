import { useState, useEffect } from "react";
import AnimeEpisodeService from "~/services/AnimeEpisodeService";

export default function useAnimeEpisode(malId) {
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeEpisodeService.getAll(malId)
      .then(data => setAnimeEpisodes(data))
      .finally(() => setIsFetching(false));
  }, []);

  return { animeEpisodes, isFetching };
}
