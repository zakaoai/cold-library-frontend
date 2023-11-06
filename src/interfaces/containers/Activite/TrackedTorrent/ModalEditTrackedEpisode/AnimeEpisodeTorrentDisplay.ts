import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";

export interface ModalAnimeEpisodeTorrentDisplay extends Omit<AnimeEpisodeTorrentDTO, "date"> {
  date: Date;
}
