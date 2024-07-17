import { CardContent } from "@mui/material"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import AnimeCardAvatar from "./AnimeCardAvatar"
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber"
import AnimeCardGenre from "./AnimeCardGenre"
import AnimeCardHeaderActions from "./AnimeCardHeaderActions"
import AnimeCardImage from "./AnimeCardImage"
import AnimeCardTitle from "./AnimeCardTitle"
import AnimeCardReadProvider from "./context/AnimeCardReadProvider"
import type IAnimeCardProvider from "./interface/AnimeCardProvider"
import type IAnimeCardReadComponent from "./interface/AnimeCardReadComponent"

const AnimeCardReadComponent = ({
  selectedGenres,
  actions,
  anime,
  showEpisodeLink,
  imageHeight,
  avatarColor
}: IAnimeCardReadComponent & IAnimeCardProvider) => (
  <AnimeCardReadProvider anime={anime} showEpisodeLink={showEpisodeLink} imageHeight={imageHeight}>
    <Card>
      <CardHeader
        sx={{ height: "100px" }}
        avatar={<AnimeCardAvatar avatarColor={avatarColor} />}
        action={<AnimeCardHeaderActions />}
        title={<AnimeCardTitle />}
        subheader={<AnimeCardEpisodeNumber />}
      />
      {anime.genres !== undefined ? (
        <CardContent sx={{ paddingTop: 0 }}>
          <AnimeCardGenre selectedGenres={selectedGenres} />
        </CardContent>
      ) : undefined}

      <AnimeCardImage />
      {actions}
    </Card>
  </AnimeCardReadProvider>
)

export default AnimeCardReadComponent
