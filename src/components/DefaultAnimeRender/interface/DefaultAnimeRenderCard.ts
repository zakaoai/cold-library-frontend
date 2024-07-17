import type AnimeCardProvider from "@/components/AnimeCardRead/interface/AnimeCardProvider"
import type AnimeCardReadComponent from "@/components/AnimeCardRead/interface/AnimeCardReadComponent"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { Dispatch, SetStateAction } from "react"

export default interface DefaultAnimeRenderCard<Anime> {
  anime: AnimeDTO
  setAnimeListState: Dispatch<SetStateAction<Anime[]>>
  selectedGenres?: string[]
  animeCardRead?: Partial<AnimeCardReadComponent & AnimeCardProvider>
}
