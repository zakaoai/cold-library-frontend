import type AnimeRowRead from "@/components/AnimeRowRead/interface/AnimeRowRead"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { Dispatch, SetStateAction } from "react"

export default interface DefaultAnimeRenderRow<Anime> {
  anime: AnimeDTO
  setAnimeListState: Dispatch<SetStateAction<Anime[]>>
  selectedGenres?: string[]
  animeRowRead?: Partial<AnimeRowRead>
}
