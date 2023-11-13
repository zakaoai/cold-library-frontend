import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

function AnimeCardTitle({ title }) {
  return title ? (
    <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: 100 }}>{title}</Typography>
  ) : (
    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
  )
}

export default AnimeCardTitle
