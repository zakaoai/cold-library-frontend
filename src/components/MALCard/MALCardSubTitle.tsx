import Skeleton from "@mui/material/Skeleton"
import { MALCardProps } from "./MALCard"

const MALCardSubtitle = ({ malAnime }: MALCardProps) => {
  const { episodes } = malAnime
  return episodes !== undefined ? (
    `Nb Episodes : ${episodes}`
  ) : (
    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
  )
}

export default MALCardSubtitle
