import AnimeCardReadComponent from "@/components/AnimeCardRead/AnimeCardReadComponent"
import { CardActions } from "@mui/material"
import Grid from "@mui/material/Grid"

import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import DefaultAnimeAction from "../DefaultAnimeAction/DefaultAnimeAction"
import type IDefaultAnimeRenderCard from "./interface/DefaultAnimeRenderCard"

const DefaultAnimeRenderCard = <T extends AnimeDTO>({
  anime,
  setAnimeListState,
  selectedGenres,
  animeCardRead
}: IDefaultAnimeRenderCard<T>) => (
  <Grid size={{ lg: 3, md: 4, xs: 12, sm: 6 }}>
    <AnimeCardReadComponent
      selectedGenres={selectedGenres}
      anime={anime}
      actions={
        <CardActions disableSpacing>
          <DefaultAnimeAction anime={anime} setAnimeListState={setAnimeListState} />
        </CardActions>
      }
      {...animeCardRead}
    />
  </Grid>
)

export default DefaultAnimeRenderCard
