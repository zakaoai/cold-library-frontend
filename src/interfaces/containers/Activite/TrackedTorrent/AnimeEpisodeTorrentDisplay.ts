import { type AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"

export default interface AnimeEpisodeTorrentDisplay extends AnimeEpisodeTorrentDTO {
  byteSize: number
  displaySize: string
  dateObj: Date
}
