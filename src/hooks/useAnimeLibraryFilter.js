import { useEffect, useState } from "react";
import StorageState from "~/constants/StorageState";

// Filter list of anime and store filters in localStorage
const useAnimeLibraryFilter = function () {
  const [filters, setFilters] = useState(JSON.parse(localStorage.getItem("animeLibraryFilters")) || {});

  const defaultFilters = {
    filterStorageState: StorageState.FLUX_FROID,
    filterTrackedAnime: false,
    filterCompletedAnime: false,
    isFilterTrackedAnimeApplied: false,
    isFilterCompletedAnimeApplied: false
  };

  const [filterStorageState, setFilterStorageState] = useState(
    filters.filterStorageState || defaultFilters.filterStorageState
  );
  const [filterTrackedAnime, setFilterTrackedAnime] = useState(
    filters.filterTrackedAnime || defaultFilters.filterTrackedAnime
  );
  const [isFilterTrackedAnimeApplied, setIsFilterTrackedAnimeApplied] = useState(
    filters.isFilterTrackedAnimeApplied || defaultFilters.isFilterTrackedAnimeApplied
  );

  const [filterCompletedAnime, setFilterCompletedAnime] = useState(
    filters.filterCompletedAnime || defaultFilters.filterCompletedAnime
  );
  const [isFilterCompletedAnimeApplied, setIsFilterCompleteAnimeApplied] = useState(
    filters.isFilterCompletedAnimeApplied || defaultFilters.isFilterCompletedAnimeApplied
  );

  const [filterFunc, setFilterFunc] = useState(() => () => true);

  // func that set all filter to default
  const resetFilters = () => {
    setFilterStorageState(defaultFilters.filterStorageState);
    setFilterTrackedAnime(defaultFilters.filterTrackedAnime);
    setIsFilterTrackedAnimeApplied(defaultFilters.isFilterTrackedAnimeApplied);
    setFilterCompletedAnime(defaultFilters.filterCompletedAnime);
    setIsFilterCompleteAnimeApplied(defaultFilters.isFilterCompletedAnimeApplied);
  };

  useEffect(() => {
    localStorage.setItem("animeLibraryFilters", JSON.stringify(filters));

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

  useEffect(() => {
    setFilters({
      filterStorageState,
      filterTrackedAnime,
      filterCompletedAnime,
      isFilterTrackedAnimeApplied,
      isFilterCompletedAnimeApplied
    });
  }, [
    filterStorageState,
    filterTrackedAnime,
    isFilterTrackedAnimeApplied,
    filterCompletedAnime,
    isFilterCompletedAnimeApplied
  ]);

  return {
    filtersState: {
      ...filters,
      setFilterStorageState,
      setFilterTrackedAnime,
      setIsFilterTrackedAnimeApplied,
      setFilterCompletedAnime,
      setIsFilterCompleteAnimeApplied,
      resetFilters
    },
    filterFunc
  };
};

export default useAnimeLibraryFilter;
