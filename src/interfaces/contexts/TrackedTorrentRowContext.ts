import { UseMutateFunction } from "@tanstack/react-query";
import { AnimeEpisodeTorrentDisplay } from "../containers/Activite/TrackedTorrent/AnimeEpisodeTorrentDisplay";
import { AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";
import { TrackedAnimeTorrentDTO } from "../services/TrackedAnimeTorrentService/TrackedAnimeTorrentDTO";

export default interface TrackedTorrentRowContext {
  patchTrackedAnimeEpisode: UseMutateFunction<AnimeEpisodeTorrentDTO, Error, AnimeEpisodeTorrentDTO, unknown>;
  setEpisodes: React.Dispatch<React.SetStateAction<AnimeEpisodeTorrentDisplay[]>>;
  setSelectedEpisodeAlternate: React.Dispatch<React.SetStateAction<unknown>>;
  setShowModalAlternateEpisode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTorrent: UseMutateFunction<void, Error, number, unknown>;
  trackedTorrent: TrackedAnimeTorrentDTO;
  showedTorrents: AnimeEpisodeTorrentDisplay[];
  searchPack: UseMutateFunction<AnimeEpisodeTorrentDTO, Error, void, unknown>;
  scanEpisodes: UseMutateFunction<AnimeEpisodeTorrentDTO[], Error, void, unknown>;
  scanNextEpisode: UseMutateFunction<AnimeEpisodeTorrentDTO, unknown, string, unknown>;
}
