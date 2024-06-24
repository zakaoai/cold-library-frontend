import { type AnimeType } from "@/enums/AnimeType"
import type Season from "@/enums/Season"
import { type Dispatch, type SetStateAction } from "react"
import type MALAnime from "../services/UserService/MyAnimeList/MALAnime"

export default interface SeasonContext {
  seasonSelected: Season
  setSeasonSelected: Dispatch<SetStateAction<Season>>
  yearSelected: number
  setYearSelected: Dispatch<SetStateAction<number>>
  sortBySelected: keyof MALAnime
  setSortBySelected: Dispatch<SetStateAction<keyof MALAnime>>
  typeSelected: AnimeType
  setTypeSelected: Dispatch<SetStateAction<AnimeType>>
}
