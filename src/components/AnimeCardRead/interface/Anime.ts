import type { AnimeType } from "@/enums/AnimeType"
import type Season from "@/enums/Season"
import type AnimeGenre from "./AnimeGenre"

export interface Anime {
  malId: number
  malUrl: string
  malImg?: string
  title: string
  type?: AnimeType
  episodes?: number
  status?: string
  score?: number
  season?: Season
  year?: number
  broadcast?: string
  genres?: AnimeGenre[]
  addedOnServer?: [number, number, number, number, number, number, number]
}
