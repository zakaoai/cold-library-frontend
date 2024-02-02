import { type DayOfWeek } from "@/enums/DayOfWeek"

export interface TrackedAnimeTorrentDTO {
  malId: number
  lastEpisodeOnServer: number
  searchWords: string
  dayOfRelease: DayOfWeek
  deltaEpisode: number
  torrentPath: string
}
