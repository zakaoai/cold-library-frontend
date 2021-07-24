const { default: AnimeServices } = require("~/services/AnimeServices");
const { default: TrackedAnimeTorrentService } = require("~/services/TrackedAnimeTorrentService");

const updateAnimeState = (malId, defaultAnime, updateAnime) => {
  const setLastAvaibleEpisode = LastAvaibleEpisode =>
    AnimeServices.updateLastAvaibleEpisode(malId, LastAvaibleEpisode).then(updatedAnime => updateAnime(updatedAnime));
  const setIsComplete = isComplete =>
    AnimeServices.updateIsComplete(malId, isComplete).then(updatedAnime => updateAnime(updatedAnime));
  const setStorageState = storageState =>
    AnimeServices.updateStorageState(malId, storageState).then(updatedAnime => updateAnime(updatedAnime));

  const deleteAnime = () => AnimeServices.delete(malId).then(() => updateAnime(defaultAnime));

  const saveAnime = () => AnimeServices.saveInLibrary(malId).then(updatedAnime => updateAnime(updatedAnime));

  const trackAnime = trackedTorrent => {
    let trackedPromise = null;
    if (trackedTorrent) {
      trackedPromise = TrackedAnimeTorrentService.saveInLibrary(malId);
    } else {
      trackedPromise = TrackedAnimeTorrentService.delete(malId);
    }
    trackedPromise.then(() =>
      updateAnime({
        malId,
        trackedTorrent: trackedTorrent
      })
    );
  };

  return {
    setLastAvaibleEpisode,
    setIsComplete,
    setStorageState,
    deleteAnime,
    saveAnime,
    trackAnime
  };
};

export default updateAnimeState;
