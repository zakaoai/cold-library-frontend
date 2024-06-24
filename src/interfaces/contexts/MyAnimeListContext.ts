import { type RenderMode } from "@/enums/RenderMode"
import { type ViewMode } from "@/enums/ViewMode"

import type usePagination from "@/hooks/usePagination"
import { type Dispatch, type SetStateAction } from "react"
import { type AnimeDTO } from "../services/AnimeService/AnimeDTO"
import type MALAnime from "../services/UserService/MyAnimeList/MALAnime"

export default interface MyAnimeListContext {
  selectedGenres: string[]
  setSelectedGenres: Dispatch<SetStateAction<string[]>>
  userStatusFilter: string
  setuserStatusFilter: Dispatch<SetStateAction<string>>
  myAnimeList: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>
  setMyAnimeList: Dispatch<SetStateAction<Array<Omit<MALAnime, "broadcast"> & AnimeDTO>>>
  selectedViewMode: ViewMode
  setSelectedViewMode: Dispatch<SetStateAction<ViewMode>>
  selectedRenderMode: RenderMode
  setSelectedRenderMode: Dispatch<SetStateAction<RenderMode>>
  updateAnimeStateFunction: (a: AnimeDTO) => void
  pagination: ReturnType<typeof usePagination>
}
