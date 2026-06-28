import { Chip, Stack } from "@mui/material"
import { useAnimeCardReadContext } from "./hooks/useAnimeCardContext"
import type AnimeCardReadComponent from "./interface/AnimeCardReadComponent"

const AnimeCardGenre = ({ selectedGenres }: AnimeCardReadComponent) => {
  const { anime } = useAnimeCardReadContext()

  return (
    <Stack direction="row" useFlexGap spacing={1} sx={{ flexWrap: "wrap" }}>
      {anime.genres
        ?.toSorted((a, b) => a.name.localeCompare(b.name))
        .map(genre =>
          selectedGenres?.includes(genre.name) === true ? (
            <Chip key={`${anime.malId}-${genre.id}`} label={genre.name} variant="filled" />
          ) : (
            <Chip key={`${anime.malId}-${genre.id}`} label={genre.name} variant="outlined" />
          )
        )}
    </Stack>
  )
}

export default AnimeCardGenre
