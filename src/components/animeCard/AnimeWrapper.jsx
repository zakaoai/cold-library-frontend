import AnimeCardComponent from "./AnimeCardComponent"
import AnimeCardProvider from "./context/AnimeCardProvider"

const AnimeWrapper = ({
  anime,
  updateAnime,
  showEpisodeLink = false,
  showAddOrRemoveFromLibrary = false,
  imageHeight = "190px"
}) => (
  <AnimeCardProvider
    anime={anime}
    updateAnime={updateAnime}
    showEpisodeLink={showEpisodeLink}
    imageHeight={imageHeight}
    showAddOrRemoveFromLibrary={showAddOrRemoveFromLibrary}>
    <AnimeCardComponent />
  </AnimeCardProvider>
)

export default AnimeWrapper
