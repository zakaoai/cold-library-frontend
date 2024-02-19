import { type DayOfWeek } from "@/enums/DayOfWeek"

export interface AnimeTorrentDTO {
  malId: number
  lastEpisodeOnServer: number
  searchWords: string
  dayOfRelease: DayOfWeek
  deltaEpisode: number
  torrentPath: string
}
