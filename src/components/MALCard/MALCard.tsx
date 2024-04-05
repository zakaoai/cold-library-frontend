import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { CardContent, Chip, Stack } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import MALCardAvatar from "./MALCardAvatar"
import MALCardBottomActions from "./MALCardBottomActions"
import MALCardImage from "./MALCardImage"
import MALCardSubtitle from "./MALCardSubTitle"
import MALCardTitle from "./MALCardTitle"

export interface MALCardProps {
  malAnime: Omit<MALAnime, "broadcast"> & AnimeDTO
}

const MALCard = ({ malAnime, selectedGenre }: MALCardProps & { selectedGenre: string[] }) => {
  return (
    <Card>
      <CardHeader
        sx={{ height: "100px" }}
        avatar={<MALCardAvatar malAnime={malAnime} />}
        title={<MALCardTitle malAnime={malAnime} />}
        subheader={<MALCardSubtitle malAnime={malAnime} />}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          {malAnime.genres.map(genre =>
            selectedGenre.includes(genre.name) ? (
              <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="filled" />
            ) : (
              <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="outlined" />
            )
          )}
        </Stack>
      </CardContent>
      <MALCardImage malAnime={malAnime} />
      <CardActions disableSpacing>
        <MALCardBottomActions malAnime={malAnime} />
      </CardActions>
    </Card>
  )
}

export default MALCard
