import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { type MouseEvent as ReactMouseEvent } from "react"

export default interface KeyListPagination {
  slicedGroupedData: Array<Record<string, Array<Omit<MALAnime, "broadcast"> & AnimeDTO>>>
  onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void
  page: number
  reversed?: boolean
}
