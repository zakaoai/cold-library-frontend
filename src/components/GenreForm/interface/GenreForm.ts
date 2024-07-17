import type MALGenre from "@/interfaces/services/UserService/MyAnimeList/MALGenre"
import type { SelectChangeEvent } from "@mui/material"

export default interface GenreForm {
  selectedGenres: string[]
  handleChangeGenre: (event: SelectChangeEvent<string[]>) => void
  handleClearGenre: () => void
  onCloseGenre: () => void
  genres: MALGenre[]
}
