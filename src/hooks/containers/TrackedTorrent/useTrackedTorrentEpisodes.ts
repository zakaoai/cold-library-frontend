import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService";
import { formatEpisode } from "@/utils/torrentEpisode";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

const useTrackedTorrentEpisodes = (malId: number, lastEpisodeOnServer: number) => {
  const [episodes, setEpisodes] = useState<AnimeEpisodeTorrentDTO[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    AnimeEpisodeTorrentService.getAnimeEpisodesTorrents(malId).then(trackedEpisodes => {
      setEpisodes(trackedEpisodes.map(episode => formatEpisode(episode)));
      setIsFetching(false);
    });
  }, []);

  const patchTrackedAnimeEpisode = useCallback(
    (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) => {
      if (!isFetching) {
        setIsFetching(true);
        AnimeEpisodeTorrentService.replaceEpisodeTorrent(malId, animeEpisodeTorrent)
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
      AnimeEpisodeTorrentService.scanEpisodeTorrent(malId)
        .then(episodes =>
          setEpisodes(currentEpisodes => [...currentEpisodes, ...episodes.map(episode => formatEpisode(episode))])
        )
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, setEpisodes, setIsFetching]);

  const searchPack = useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);
      AnimeEpisodeTorrentService.scanPackTorrent(malId)
        .then(episode => setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(episode)]))
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, setEpisodes, setIsFetching]);

  const deleteTorrentCall = useCallback(
    (episodeNumber: number) => AnimeEpisodeTorrentService.deleteTorrent(malId, episodeNumber),
    []
  );

  const onSuccessDeleteTorrent = useCallback(
    (_: void, episodeNumber: number) => {
      setEpisodes(episodes => episodes.filter(ep => ep.episodeNumber !== episodeNumber));
    },
    [setEpisodes]
  );

  const onErrorDeleteTorrent = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId);
  }, []);

  const { isPending: isdDeleteTorrentPending, mutate: deleteTorrent } = useMutation({
    mutationFn: deleteTorrentCall,
    onSuccess: onSuccessDeleteTorrent,
    onError: onErrorDeleteTorrent
  });

  const onSuccessScanNextEpisodeTorrent = useCallback(
    (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(animeEpisodeTorrent)]);
    },
    [setEpisodes]
  );

  const onErrorScanNextEpisodeTorrent = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId);
  }, []);

  const { isPending: isScanNextEpisodePending, mutate: scanNextEpisode } = useMutation<
    AnimeEpisodeTorrentDTO,
    unknown,
    string
  >({
    mutationFn: () => AnimeEpisodeTorrentService.scanNextEpisodeTorrent(malId),
    onSuccess: onSuccessScanNextEpisodeTorrent,
    onError: onErrorScanNextEpisodeTorrent
  });

  const isScanNextEpisodeAvaible = useMemo(
    () =>
      episodes.length === 0 ||
      episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)[episodes.length - 1].episodeNumber ===
        lastEpisodeOnServer,
    [episodes]
  );

  return {
    episodes,
    isFetching,
    scanEpisodes,
    isScanNextEpisodePending,
    isScanNextEpisodeAvaible,
    scanNextEpisode,
    patchTrackedAnimeEpisode,
    searchPack,
    isdDeleteTorrentPending,
    deleteTorrent,
    setEpisodes
  };
};

export default useTrackedTorrentEpisodes;
