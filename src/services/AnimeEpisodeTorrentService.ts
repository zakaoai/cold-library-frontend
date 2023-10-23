import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";
import api from "./api";
import { deleteRequest, get, put } from "./request/request";

const AnimeEpisodeTorrentService = {
  getAnimeEpisodesTorrents: (malId: number) =>
    get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.getAnimeEpisodesTorrents(malId)),
  searchAlternateEpisodeTorrent: (malId: number, episodeNumber: number) =>
    get<AnimeEpisodeTorrentDTO[]>(api.animeTorrentEpisode.searchAlternateEpisodeTorrent(malId, episodeNumber)),
  replaceEpisodeTorrent: (malId: number, animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
    put<AnimeEpisodeTorrentDTO, AnimeEpisodeTorrentDTO>(
      api.animeTorrentEpisode.replaceEpisodeTorrent(malId, animeEpisodeTorrent.episodeNumber),
      animeEpisodeTorrent
    ),
  scanEpisodeTorrent: (malId: number) =>
    get<AnimeEpisodeTorrentDTO[]>(api.animeTorrentEpisode.scanEpisodeTorrent(malId)),
  scanPackTorrent: (malId: number) => get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.scanPackTorrent(malId)),
  scanNextEpisodeTorrent: (malId: number) =>
    get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.scanNextEpisodeTorrent(malId)),
  deleteTorrent: (malId: number, episodeNumber: number) =>
    deleteRequest(api.animeTorrentEpisode.deleteTorrent(malId, episodeNumber)),
  updateTorrent: (malId: number, episodeNumber: number) =>
    get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.updateTorrent(malId, episodeNumber))
};

export default AnimeEpisodeTorrentService;
