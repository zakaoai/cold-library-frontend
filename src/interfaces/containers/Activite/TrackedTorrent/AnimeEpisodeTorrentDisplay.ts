import { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO";

export interface AnimeEpisodeTorrentDisplay extends AnimeEpisodeTorrentDTO {
  byteSize: number;
  displaySize: string;
}
