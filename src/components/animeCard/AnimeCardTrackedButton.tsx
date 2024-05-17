import IconButton from "@mui/material/IconButton"
import green from "@mui/material/colors/green"

import CloudDownloadIcon from "@mui/icons-material/CloudDownload"
import type IAnimeCardTrackedButton from "./interface/AnimeCardTrackedButton"

const AnimeCardTrackedButton = ({ isAnimeTracked, trackAnime }: IAnimeCardTrackedButton) => (
  <IconButton
    aria-label="Track or UnTrack Anime"
    title="Ajouter ou Supprimer l'anime à la liste des torrents suivie"
    onClick={() => {
      trackAnime(!isAnimeTracked)
    }}
    style={isAnimeTracked ? { color: green[500] } : {}}
    size="large">
    <CloudDownloadIcon />
  </IconButton>
)

export default AnimeCardTrackedButton
