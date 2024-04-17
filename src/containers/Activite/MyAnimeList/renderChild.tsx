import MALCard from "@/components/MALCard/MALCard"
import MALRow from "@/components/MALRow/MALRow"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2

export const tableRenderChild = (animelist: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>) =>
  animelist.map(anime => <MALRow key={anime.malId} malAnime={anime} />)

export const cardRenderChild = (animelist: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>) =>
  animelist.map(anime => (
    <Grid key={anime.malId} lg={3} md={4} xs={12} sm={6}>
      <MALCard malAnime={anime} />
    </Grid>
  ))

export const singleCardRender = (anime: Omit<MALAnime, "broadcast"> & AnimeDTO, key: number) => (
  <Grid key={anime.malId} lg={3} md={4} xs={12} sm={6}>
    <MALCard malAnime={anime} />
  </Grid>
)

export const singleTableRender = (anime: Omit<MALAnime, "broadcast"> & AnimeDTO, key: number) => (
  <MALRow key={anime.malId} malAnime={anime} />
)
