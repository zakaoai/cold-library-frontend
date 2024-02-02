import AnimeCardComponent from "./AnimeCardComponent"
import AnimeCardProvider from "./context/AnimeCardProvider"

export default function AnimeWrapper({
  anime,
  updateAnime,
  showEpisodeLink = false,
  showAddOrRemoveFromLibrary = false,
  imageHeight = "190px"
}) {
  return (
    <AnimeCardProvider
      anime={anime}
      updateAnime={updateAnime}
      showEpisodeLink={showEpisodeLink}
      imageHeight={imageHeight}
      showAddOrRemoveFromLibrary={showAddOrRemoveFromLibrary}>
      <AnimeCardComponent />
    </AnimeCardProvider>
  )
}
