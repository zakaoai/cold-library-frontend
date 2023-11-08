import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"

import MoreIcon from "@mui/icons-material/More"

function AnimeCardLink({ malId }) {
  return (
    <IconButton component={Link} to={`/app/anime/${malId}`} size="large">
      <MoreIcon />
    </IconButton>
  )
}

export default AnimeCardLink
