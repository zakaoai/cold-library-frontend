import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"

import MoreIcon from "@mui/icons-material/More"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeCardLink = () => {
  const { anime } = useAnimeCardContext()
  const { malId } = anime

  return (
    <IconButton component={Link} to={`/app/anime/${malId}`} size="large">
      <MoreIcon />
    </IconButton>
  )
}

export default AnimeCardLink
