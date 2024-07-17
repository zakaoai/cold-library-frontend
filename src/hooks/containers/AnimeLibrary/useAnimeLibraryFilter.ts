import StorageState from "@/enums/StorageState"
import type { Filters } from "@/interfaces/containers/Activite/AnimeLibrary/Filters"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { useCallback, useEffect, useMemo, useState } from "react"

// Filter list of anime and store filters in localStorage
const useAnimeLibraryFilter = () => {
  const defaultFilters = useMemo(
    () => ({
      filterStorageState: StorageState.FLUX_FROID,
      filterTrackedAnime: false,
      filterCompletedAnime: false,
      isFilterTrackedAnimeApplied: false,
      isFilterCompletedAnimeApplied: false
    }),
    []
  )

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    ...(JSON.parse(localStorage.getItem("animeLibraryFilters") ?? "{}") as Partial<Filters>)
  })

  const [filterFunc, setFilterFunc] = useState<(_: AnimeDTO) => boolean>(() => () => false)

  // func that set all filter to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [defaultFilters])

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
        filterTrackedAnimeFunc(anime.isDownloading ?? false) &&
        filterCompleteFunc(anime.isComplete ?? false)
    )
  }, [filters])

  const setFilterStorageState = useCallback((state: StorageState) => {
    setFilters(f => ({ ...f, filterStorageState: state }))
  }, [])

  const alternateFilterTrackedAnime = useCallback(() => {
    setFilters(f => ({ ...f, filterTrackedAnime: !f.filterTrackedAnime }))
  }, [])

  const alternateIsFilterTrackedAnimeApplied = useCallback(() => {
    setFilters(f => ({ ...f, isFilterTrackedAnimeApplied: !f.isFilterTrackedAnimeApplied }))
  }, [])

  const alternateFilterCompletedAnime = useCallback(() => {
    setFilters(f => ({ ...f, filterCompletedAnime: !f.filterCompletedAnime }))
  }, [])

  const alternateIsFilterCompleteAnimeApplied = useCallback(() => {
    setFilters(f => ({ ...f, isFilterCompletedAnimeApplied: !f.isFilterCompletedAnimeApplied }))
  }, [])

  const filtersState = useMemo(
    () => ({
      ...filters,
      setFilterStorageState,
      alternateFilterTrackedAnime,
      alternateIsFilterTrackedAnimeApplied,
      alternateFilterCompletedAnime,
      alternateIsFilterCompleteAnimeApplied,
      resetFilters
    }),
    [
      alternateFilterCompletedAnime,
      alternateFilterTrackedAnime,
      alternateIsFilterCompleteAnimeApplied,
      alternateIsFilterTrackedAnimeApplied,
      filters,
      resetFilters,
      setFilterStorageState
    ]
  )

  return {
    filtersState,
    filterFunc
  }
}

export default useAnimeLibraryFilter
