import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import api from "./api"
import { deleteRequest, get, put } from "./request/request"

const AnimeEpisodeTorrentService = {
  getAnimeEpisodesTorrents: async (malId: number) =>
    await get<AnimeEpisodeTorrentDTO[]>(api.animeTorrentEpisode.getAnimeEpisodesTorrents(malId)),
  searchAlternateEpisodeTorrent: async (malId: number, episodeNumber: number) =>
    await get<AnimeEpisodeTorrentDTO[]>(api.animeTorrentEpisode.searchAlternateEpisodeTorrent(malId, episodeNumber)),
  replaceEpisodeTorrent: async (malId: number, animeEpisodeTorrent: AnimeEpisodeTorrentDTO) =>
    await put<AnimeEpisodeTorrentDTO, AnimeEpisodeTorrentDTO>(
      api.animeTorrentEpisode.replaceEpisodeTorrent(malId, animeEpisodeTorrent.episodeNumber),
      animeEpisodeTorrent
    ),
  scanEpisodeTorrent: async (malId: number) =>
    await get<AnimeEpisodeTorrentDTO[]>(api.animeTorrentEpisode.scanEpisodeTorrent(malId)),
  scanPackTorrent: async (malId: number) =>
    await get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.scanPackTorrent(malId)),
  scanNextEpisodeTorrent: async (malId: number) =>
    await get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.scanNextEpisodeTorrent(malId)),
  deleteTorrent: async (malId: number, episodeNumber: number) =>
    await deleteRequest(api.animeTorrentEpisode.deleteTorrent(malId, episodeNumber)),
  updateTorrent: async (malId: number, episodeNumber: number) =>
    await get<AnimeEpisodeTorrentDTO>(api.animeTorrentEpisode.updateTorrent(malId, episodeNumber))
}

export default AnimeEpisodeTorrentService
