import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import type MALCardProps from "./interface/MALCardProps"

const MALCardTitle = ({ malAnime }: MALCardProps) => {
  const { title } = malAnime

  return title !== undefined ? (
    <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: 100 }}>{title}</Typography>
  ) : (
    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
  )
}

export default MALCardTitle
