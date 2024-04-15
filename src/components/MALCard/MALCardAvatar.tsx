import Avatar from "@mui/material/Avatar"
import Skeleton from "@mui/material/Skeleton"
import { blue, green, grey, red, yellow } from "@mui/material/colors"
import type MALCardProps from "./interface/MALCardProps"

const backgroundByStatus: Record<string, string> = {
  watching: green[500],
  completed: blue[500],
  on_hold: yellow[500],
  dropped: red[500],
  plan_to_watch: grey[500],
  unknown: green[50]
}

const MALCardAvatar = ({ malAnime }: MALCardProps) => {
  const { type, userStatus } = malAnime

  if (type !== undefined) {
    return (
      <Avatar
        aria-label="type"
        sx={{ backgroundColor: backgroundByStatus[userStatus ?? "unknown"] ?? "initial" }}
        title={type}>
        {type.substring(0, 3)}
      </Avatar>
    )
  }

  return <Skeleton animation="wave" variant="circular" width={40} height={40} />
}

export default MALCardAvatar
