import type DayOfWeek from "@/constants/DayOfWeek"

export interface AnimeTorrentDTO {
  malId: number
  lastEpisodeOnServer: number
  searchWords: string
  dayOfRelease: keyof typeof DayOfWeek
  deltaEpisode: number
  torrentPath: string
  title: string
  isComplete: boolean
}
