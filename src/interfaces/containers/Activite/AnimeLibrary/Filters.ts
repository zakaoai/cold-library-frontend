import type StorageState from "@/enums/StorageState"

export interface Filters {
  filterStorageState: StorageState
  filterTrackedAnime: boolean
  filterCompletedAnime: boolean
  isFilterTrackedAnimeApplied: boolean
  isFilterCompletedAnimeApplied: boolean
}
