import CardMedia from "@mui/material/CardMedia"
import Skeleton from "@mui/material/Skeleton"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { MALCardProps } from "./MALCard"

const MALCardImage = ({ malAnime }: MALCardProps) => {
  const {
    main_picture: { medium: malImg },
    title,
    id
  } = malAnime
  const malUrl = `https://myanimelist.net/anime/${id}`

  return malImg ? (
    <a href={malUrl} target="_blank" rel="noreferrer">
      <CardMedia>
        <LazyLoadImage src={malImg} title={title} style={{ width: "100%" }} />
      </CardMedia>
    </a>
  ) : (
    <Skeleton animation="wave" variant="rectangular" height={190} />
  )
}

export default MALCardImage
