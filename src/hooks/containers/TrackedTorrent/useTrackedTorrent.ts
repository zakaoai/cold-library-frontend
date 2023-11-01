import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO";
import { TrackedAnimeTorrentDTO } from "@/interfaces/services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO";
import AnimeServices from "@/services/AnimeService";
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService";
import { QueryObserverResult, useQueries } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function useTrackedTorrent() {
  const [trackedTorrents, setTrackedTorrents] = useState<(TrackedAnimeTorrentDTO & Partial<AnimeDTO>)[]>([]);

  const combine = ([animes, trackedAnimes]: [
    QueryObserverResult<AnimeDTO[], unknown>,
    QueryObserverResult<TrackedAnimeTorrentDTO[], unknown>
  ]) => ({
    data: trackedAnimes.data?.map(trackedAnime => ({
      ...trackedAnime,
      ...animes.data?.find(anime => trackedAnime.malId === anime.malId)
    })),
    isFetched: [animes, trackedAnimes].every(result => result.isFetched),
    isFetching: [animes, trackedAnimes].some(result => result.isFetching)
  });

  const { data, isFetched, isFetching } = useQueries({
    queries: [
      { queryKey: ["api.anime.getAll"], queryFn: () => AnimeServices.getAll() },
      { queryKey: ["api.trackedAnimeTorrent.getAll"], queryFn: () => TrackedAnimeTorrentService.getAll() }
    ],
    combine
  });

  useEffect(() => {
    if (isFetched && data != undefined) {
      setTrackedTorrents(data);
    }
  }, [isFetched]);

  const updateTrackedAnime = useCallback(
    (updatedTrackedAnime: TrackedAnimeTorrentDTO & Partial<AnimeDTO>) =>
      setTrackedTorrents(trackedAnimes =>
        trackedAnimes.map(trackedAnime =>
          trackedAnime.malId === updatedTrackedAnime.malId ? { ...trackedAnime, ...updatedTrackedAnime } : trackedAnime
        )
      ),
    [setTrackedTorrents]
  );

  return { trackedTorrents, isFetching, updateTrackedAnime };
}
