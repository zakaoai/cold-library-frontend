import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import AnimeCardAvatar from "./AnimeCardAvatar"
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber"
import AnimeCardHeaderActions from "./AnimeCardHeaderActions"
import AnimeCardImage from "./AnimeCardImage"
import AnimeCardTitle from "./AnimeCardTitle"

const AnimeCardReadComponent = () => {
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
    </Card>
  )
}

export default AnimeCardReadComponent
