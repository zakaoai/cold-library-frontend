import { Avatar, Skeleton } from "@mui/material"
import { red } from "@mui/material/colors"

function AnimeCardAvatar({ type }) {
  return (
    (type && (
      <Avatar aria-label="type" sx={{ backgroundColor: red[500] }} title={type}>
        {type.substring(0, 3)}
      </Avatar>
    )) || <Skeleton animation="wave" variant="circular" width={40} height={40} />
  )
}

export default AnimeCardAvatar
