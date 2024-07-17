import IconButton from "@mui/material/IconButton"
import { Link } from "react-router"

import MoreIcon from "@mui/icons-material/More"
import { useAnimeCardReadContext } from "./hooks/useAnimeCardContext"

const AnimeCardLink = () => {
  const { anime } = useAnimeCardReadContext()
  const { malId } = anime

  return (
    <IconButton component={Link} to={`/app/anime/${malId}`} size="large">
      <MoreIcon />
    </IconButton>
  )
}

export default AnimeCardLink
