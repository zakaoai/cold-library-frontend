import { type AnimeType } from "@/enums/AnimeType"
import StorageState from "@/enums/StorageState"

export interface AnimeDTO {
  malId: number
  malUrl: string
  malImg?: string
  title: string
  type?: AnimeType
  episodes?: number
  status?: string
  score?: number
  season?: string
  year?: number
  broadcast?: string
  rank?: number
  storageState?: StorageState
  isDownloading?: boolean
  isComplete?: boolean
  lastAvaibleEpisode?: number
  addedOnServer?: string
}
