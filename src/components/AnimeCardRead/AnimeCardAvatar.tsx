import Avatar from "@mui/material/Avatar"
import Skeleton from "@mui/material/Skeleton"
import { red } from "@mui/material/colors"
import { useAnimeCardReadContext } from "./hooks/useAnimeCardContext"

const AnimeCardAvatar = () => {
  const { anime } = useAnimeCardReadContext()
  const { type } = anime

  return type !== undefined ? (
    <Avatar aria-label="type" sx={{ backgroundColor: red[500] }} title={type}>
      {type.substring(0, 3)}
    </Avatar>
  ) : (
    <Skeleton animation="wave" variant="circular" width={40} height={40} />
  )
}

export default AnimeCardAvatar
