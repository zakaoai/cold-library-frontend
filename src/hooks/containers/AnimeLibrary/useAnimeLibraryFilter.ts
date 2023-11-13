import StorageState from "@/enums/StorageState"
import { type Filters } from "@/interfaces/containers/Activite/AnimeLibrary/Filters"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { useEffect, useState } from "react"

// Filter list of anime and store filters in localStorage
const useAnimeLibraryFilter = () => {
  const defaultFilters = {
    filterStorageState: StorageState.FLUX_FROID,
    filterTrackedAnime: false,
    filterCompletedAnime: false,
    isFilterTrackedAnimeApplied: false,
    isFilterCompletedAnimeApplied: false
  }

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    ...JSON.parse(localStorage.getItem("animeLibraryFilters") ?? "{}")
  })

  const [filterFunc, setFilterFunc] = useState<(_: AnimeDTO) => boolean>(() => () => false)

  // func that set all filter to default
  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  useEffect(() => {
    localStorage.setItem("animeLibraryFilters", JSON.stringify(filters))

    const {
      isFilterTrackedAnimeApplied,
      isFilterCompletedAnimeApplied,
      filterStorageState,
      filterTrackedAnime,
      filterCompletedAnime
    } = filters

    const filterTrackedAnimeFunc = (isTracked: boolean) =>
      !isFilterTrackedAnimeApplied || (isFilterTrackedAnimeApplied && isTracked === filterTrackedAnime)

    const filterCompleteFunc = (isComplete: boolean) =>
      !isFilterCompletedAnimeApplied || (isFilterCompletedAnimeApplied && isComplete === filterCompletedAnime)

    setFilterFunc(
      () => (anime: AnimeDTO) =>
        anime.storageState === filterStorageState &&
        filterTrackedAnimeFunc(anime.trackedTorrent ?? false) &&
        filterCompleteFunc(anime.isComplete ?? false)
    )
  }, [filters])

  const setFilterStorageState = (state: StorageState) => {
    setFilters(f => ({ ...f, filterStorageState: state }))
  }
  const alternateFilterTrackedAnime = () => {
    setFilters(f => ({ ...f, filterTrackedAnime: !f.filterTrackedAnime }))
  }
  const alternateIsFilterTrackedAnimeApplied = () => {
    setFilters(f => ({ ...f, isFilterTrackedAnimeApplied: !f.isFilterTrackedAnimeApplied }))
  }
  const alternateFilterCompletedAnime = () => {
    setFilters(f => ({ ...f, filterCompletedAnime: !f.filterCompletedAnime }))
  }
  const alternateIsFilterCompleteAnimeApplied = () => {
    setFilters(f => ({ ...f, isFilterCompletedAnimeApplied: !f.isFilterCompletedAnimeApplied }))
  }

  return {
    filtersState: {
      ...filters,
      setFilterStorageState,
      alternateFilterTrackedAnime,
      alternateIsFilterTrackedAnimeApplied,
      alternateFilterCompletedAnime,
      alternateIsFilterCompleteAnimeApplied,
      resetFilters
    },
    filterFunc
  }
}

export default useAnimeLibraryFilter
