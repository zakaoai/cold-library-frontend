import { type AnimeType } from "@/enums/AnimeType"
import type StorageState from "@/enums/StorageState"

export interface AnimeDTO {
  malId: number
  title: string
  url: string
  imageUrl?: string
  type?: AnimeType
  nbEpisodes?: number
  storageState?: StorageState
  isComplete?: boolean
  lastAvaibleEpisode?: number
  trackedTorrent?: boolean // Not in DTO used for interface
}
