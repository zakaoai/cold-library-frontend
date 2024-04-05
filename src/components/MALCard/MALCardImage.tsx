import CardMedia from "@mui/material/CardMedia"
import Skeleton from "@mui/material/Skeleton"
import { MALCardProps } from "./MALCard"

const MALCardImage = ({ malAnime }: MALCardProps) => {
  const {
    main_picture: { large: malImg },
    title,
    id
  } = malAnime
  const malUrl = `https://myanimelist.net/anime/${id}`

  return malImg ? (
    <a href={malUrl} target="_blank" rel="noreferrer">
      <CardMedia component={"img"} src={malImg} title={title} />
    </a>
  ) : (
    <Skeleton animation="wave" variant="rectangular" height={190} />
  )
}

export default MALCardImage
