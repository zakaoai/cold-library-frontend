import StorageState from "@/constants/StorageState";
import { useEffect, useState } from "react";

// Filter list of anime and store filters in localStorage
const useAnimeLibraryFilter = function () {
  const defaultFilters = {
    filterStorageState: StorageState.FLUX_FROID,
    filterTrackedAnime: false,
    filterCompletedAnime: false,
    isFilterTrackedAnimeApplied: false,
    isFilterCompletedAnimeApplied: false
  };

  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...JSON.parse(localStorage.getItem("animeLibraryFilters"))
  });

  const [filterFunc, setFilterFunc] = useState(() => () => false);

  // func that set all filter to default
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    localStorage.setItem("animeLibraryFilters", JSON.stringify(filters));

    const {
      isFilterTrackedAnimeApplied,
      isFilterCompletedAnimeApplied,
      filterStorageState,
      filterTrackedAnime,
      filterCompletedAnime
    } = filters;

    const filterTrackedAnimeFunc = isTracked =>
      !isFilterTrackedAnimeApplied || (isFilterTrackedAnimeApplied && isTracked === filterTrackedAnime);

    const filterCompleteFunc = isComplete =>
      !isFilterCompletedAnimeApplied || (isFilterCompletedAnimeApplied && isComplete === filterCompletedAnime);

    setFilterFunc(
      () => anime =>
        anime.storageState === filterStorageState &&
        filterTrackedAnimeFunc(anime.trackedTorrent) &&
        filterCompleteFunc(anime.isComplete)
    );
  }, [filters]);

  const setFilterStorageState = state => setFilters(f => ({ ...f, filterStorageState: state }));
  const alternateFilterTrackedAnime = () => setFilters(f => ({ ...f, filterTrackedAnime: !f.filterTrackedAnime }));
  const alternateIsFilterTrackedAnimeApplied = () =>
    setFilters(f => ({ ...f, isFilterTrackedAnimeApplied: !f.isFilterTrackedAnimeApplied }));
  const alternateFilterCompletedAnime = () =>
    setFilters(f => ({ ...f, filterCompletedAnime: !f.filterCompletedAnime }));
  const alternateIsFilterCompleteAnimeApplied = () =>
    setFilters(f => ({ ...f, isFilterCompletedAnimeApplied: !f.isFilterCompletedAnimeApplied }));

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
  };
};

export default useAnimeLibraryFilter;
