export interface AnimeEpisodeDTO {
  id: number
  malId: number
  episodeNumber: number
  title: string
  url?: string
  date?: [number, number, number, number, number]
}
