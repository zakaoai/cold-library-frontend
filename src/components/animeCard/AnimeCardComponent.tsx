import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import AnimeCardAvatar from "./AnimeCardAvatar"
import AnimeCardBottomActions from "./AnimeCardBottomActions"
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber"
import AnimeCardHeaderActions from "./AnimeCardHeaderActions"
import AnimeCardImage from "./AnimeCardImage"
import AnimeCardTitle from "./AnimeCardTitle"

const AnimeCardComponent = () => {
  return (
    <Card>
      <CardHeader
        sx={{ height: "100px" }}
        avatar={<AnimeCardAvatar />}
        action={<AnimeCardHeaderActions />}
        title={<AnimeCardTitle />}
        subheader={<AnimeCardEpisodeNumber />}
      />
      <AnimeCardImage />

      <CardActions disableSpacing>
        <AnimeCardBottomActions />
      </CardActions>
    </Card>
  )
}

export default AnimeCardComponent
