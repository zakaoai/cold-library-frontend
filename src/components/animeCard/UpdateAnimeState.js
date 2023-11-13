import AnimeServices from "@/services/AnimeService"
import TrackedAnimeTorrentService from "@/services/TrackedAnimeTorrentService"

const updateAnimeState = (malId, defaultAnime, updateAnime) => {
  const setLastAvaibleEpisode = async LastAvaibleEpisode =>
    await AnimeServices.updateLastAvaibleEpisode(malId, LastAvaibleEpisode).then(updatedAnime =>
      updateAnime(updatedAnime)
    )
  const setIsComplete = async isComplete =>
    await AnimeServices.updateIsComplete(malId, isComplete).then(updatedAnime => updateAnime(updatedAnime))
  const setStorageState = async storageState =>
    await AnimeServices.updateStorageState(malId, storageState).then(updatedAnime => updateAnime(updatedAnime))

  const deleteAnime = async () => await AnimeServices.delete(malId).then(() => updateAnime(defaultAnime))

  const saveAnime = async () => await AnimeServices.saveInLibrary(malId).then(updatedAnime => updateAnime(updatedAnime))

  const trackAnime = trackedTorrent => {
    let trackedPromise = null
    if (trackedTorrent) {
      trackedPromise = TrackedAnimeTorrentService.saveInLibrary(malId)
    } else {
      trackedPromise = TrackedAnimeTorrentService.delete(malId)
    }
    trackedPromise.then(() =>
      updateAnime({
        malId,
        trackedTorrent: !!trackedTorrent
      })
    )
  }

  return {
    setLastAvaibleEpisode,
    setIsComplete,
    setStorageState,
    deleteAnime,
    saveAnime,
    trackAnime
  }
}

export default updateAnimeState
