import StorageState from "@/enums/StorageState"

export interface AnimeInServerDTO {
  malId: number
  storageState: StorageState
  isDownloading: boolean
  isComplete: boolean
  lastAvaibleEpisode: number
  addedOnServer: string
}
