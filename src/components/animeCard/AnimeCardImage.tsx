import CardMedia from "@mui/material/CardMedia"
import Skeleton from "@mui/material/Skeleton"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeCardImage = () => {
  const {
    anime: { malUrl, malImg, title },
    imageHeight
  } = useAnimeCardContext()

  return (
    (malImg && (
      <a href={malUrl} target="_blank" rel="noreferrer">
        <CardMedia component={"img"} style={{ maxHeight: imageHeight }} src={malImg} title={title} />
      </a>
    )) || <Skeleton animation="wave" variant="rectangular" height={190} />
  )
}

export default AnimeCardImage
