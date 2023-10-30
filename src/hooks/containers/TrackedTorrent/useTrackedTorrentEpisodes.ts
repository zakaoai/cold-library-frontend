import { AnimeEpisodeTorrentDisplay } from "@/interfaces/containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay";
import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService";
import { formatEpisode } from "@/utils/torrentEpisode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

const useTrackedTorrentEpisodes = (malId: number, lastEpisodeOnServer: number) => {
  const [episodes, setEpisodes] = useState<AnimeEpisodeTorrentDisplay[]>([]);

  // Get
  const { isFetched: allTorentsFetched, data: torrentsEpisode } = useQuery({
    queryKey: ["torrents", malId],
    queryFn: () => AnimeEpisodeTorrentService.getAnimeEpisodesTorrents(malId)
  });

  useEffect(() => {
    if (allTorentsFetched && torrentsEpisode != undefined) {
      setEpisodes(torrentsEpisode.map(episode => formatEpisode(episode)));
    }
  }, []);

  // Patch Episode
  const patchTrackedAnimeEpisodeCall = useCallback(
    (animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
      AnimeEpisodeTorrentService.replaceEpisodeTorrent(malId, animeEpisodeTorrent),
    []
  );

  const onSuccessPatchTrackedAnimeEpisode = useCallback(
    (updatedEpisode: AnimeEpisodeTorrentDTO) => {
      setEpisodes(episodes => [
        ...episodes.filter(ep => ep.episodeNumber !== updatedEpisode.episodeNumber),
        formatEpisode(updatedEpisode)
      ]);
    },
    [setEpisodes]
  );

  const onErroPatchTrackedAnimeEpisode = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId);
  }, []);

  const { isPending: isPatchTrackedAnimeEpisodePending, mutate: patchTrackedAnimeEpisode } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: patchTrackedAnimeEpisodeCall,
    onSuccess: onSuccessPatchTrackedAnimeEpisode,
    onError: onErroPatchTrackedAnimeEpisode
  });

  // Scan All Episode
  const scanEpisodesCall = useCallback(() => AnimeEpisodeTorrentService.scanEpisodeTorrent(malId), []);

  const onSuccessScanEpisodes = useCallback(
    (newEpisodes: AnimeEpisodeTorrentDTO[]) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, ...newEpisodes.map(episode => formatEpisode(episode))]);
    },
    [setEpisodes]
  );

  const onErrorScanEpisodes = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId);
  }, []);

  const { isPending: isScanEpisodesPending, mutate: scanEpisodes } = useMutation({
    mutationKey: ["torrent", malId],
    mutationFn: scanEpisodesCall,
    onSuccess: onSuccessScanEpisodes,
    onError: onErrorScanEpisodes
  });

  // Search Pack
  const searchPackCall = useCallback(() => AnimeEpisodeTorrentService.scanPackTorrent(malId), []);

  const onSuccessSearchPack = useCallback(
    (newEpisode: AnimeEpisodeTorrentDTO) => {
      setEpisodes(currentEpisodes => [...currentEpisodes, formatEpisode(newEpisode)]);
    },
    [setEpisodes]
  );

  const onErrorSearchPack = useCallback(() => {
    console.error("Une erreur est survenue lors du scan du prochain episode de l'anime %s", malId);
  }, []);

  const { isPending: isSearchPackPending, mutate: searchPack } = useMutation({
    mutationKey: ["torrent", malId, 0],
    mutationFn: searchPackCall,
    onSuccess: onSuccessSearchPack,
    onError: onErrorSearchPack
  });

  // Delete
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

  // Scan Next
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
    isFetching: !allTorentsFetched,
    isScanEpisodesPending,
    scanEpisodes,
    isScanNextEpisodePending,
    isScanNextEpisodeAvaible,
    scanNextEpisode,
    isPatchTrackedAnimeEpisodePending,
    patchTrackedAnimeEpisode,
    isSearchPackPending,
    searchPack,
    isdDeleteTorrentPending,
    deleteTorrent,
    setEpisodes
  };
};

export default useTrackedTorrentEpisodes;
