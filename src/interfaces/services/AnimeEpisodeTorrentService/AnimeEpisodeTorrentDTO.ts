export interface AnimeEpisodeTorrentDTO {
  id?: number
  title: string
  date: string
  torrentLink: string
  torrentId: number
  torrentSize: string
  seeders: number
  leechers: number
  completed: number
  episodeNumber: number
  malId: number
  progress: number
}
