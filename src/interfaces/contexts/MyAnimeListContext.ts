import { RenderMode, ViewMode } from "@/containers/Activite/MyAnimeList/const"
import { Dispatch, SetStateAction } from "react"
import { AnimeDTO } from "../services/AnimeService/AnimeDTO"
import MALAnime from "../services/UserService/MyAnimeList/MALAnime"

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
}
