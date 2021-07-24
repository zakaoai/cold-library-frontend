import { useEffect, useState } from "react";
import StorageState from "~/constants/StorageState";

// Filter list of anime and store filters in localStorage
const useAnimeLibraryFilter = function () {
  const filters = JSON.parse(localStorage.getItem("animeLibraryFilters")) || {};
  const defaultFilters = {
    filterStorageState: StorageState.FLUX_FROID,
    filterTrackedAnime: false,
    isFilterTrackedAnimeApplied: false
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

  const [filterComplete, setFilterComplete] = useState(filters.filterComplete || defaultFilters.filterComplete);
  const [isFilterCompleteApplied, setIsFilterCompleteApplied] = useState(
    filters.isFilterCompleteApplied || defaultFilters.isFilterCompleteApplied
  );

  const [filterFunc, setFilterFunc] = useState(() => () => true);

  const filterTrackedAnimeFunc = isTracked =>
    !isFilterTrackedAnimeApplied || (isFilterTrackedAnimeApplied && isTracked === filterTrackedAnime);

  const filterCompleteFunc = isComplete =>
    !isFilterCompleteApplied || (isFilterCompleteApplied && isComplete === filterComplete);

  useEffect(() => {
    filters.filterStorageState = filterStorageState;
    filters.filterTrackedAnime = filterTrackedAnime;
    filters.isFilterTrackedAnimeApplied = isFilterTrackedAnimeApplied;
    filters.filterComplete = filterComplete;
    filters.isFilterCompleteApplied = isFilterCompleteApplied;
    localStorage.setItem("animeLibraryFilters", JSON.stringify(filters));

    setFilterFunc(
      () => anime =>
        anime.storageState === filterStorageState &&
        filterTrackedAnimeFunc(anime.trackedTorrent) &&
        filterCompleteFunc(anime.isComplete)
    );
  }, [filterStorageState, filterTrackedAnime, isFilterTrackedAnimeApplied, filterComplete, isFilterCompleteApplied]);

  return {
    filtersState: {
      ...filters,
      setFilterStorageState,
      setFilterTrackedAnime,
      setIsFilterTrackedAnimeApplied,
      setFilterComplete,
      setIsFilterCompleteApplied
    },
    filterFunc
  };
};

export default useAnimeLibraryFilter;
