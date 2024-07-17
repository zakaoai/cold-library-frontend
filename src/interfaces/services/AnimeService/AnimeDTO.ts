import type { AnimeType } from "@/enums/AnimeType"
import type Season from "@/enums/Season"
import type StorageState from "@/enums/StorageState"

export interface AnimeDTO {
  malId: number
  malUrl: string
  malImg?: string
  title: string
  type?: AnimeType
  episodes?: number
  status?: string
  score?: number
  season?: Season
  year?: number
  broadcast?: string
  rank?: number
  storageState?: StorageState
  isDownloading?: boolean
  isComplete?: boolean
  lastAvaibleEpisode?: number
  addedOnServer?: [number, number, number, number, number, number, number]
}
