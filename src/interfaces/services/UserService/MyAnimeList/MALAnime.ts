import type UserAnimeStatus from "@/enums/UserAnimeStatus"
import type MALBroadcast from "./MALBroadcast"
import type MALGenre from "./MALGenre"
import type MALPicture from "./MALPicture"
import type MALSeason from "./MALSeason"

export default interface MALAnime {
  id: number
  title: string
  main_picture: MALPicture
  start_date?: string
  end_date?: string
  mean: number
  rank: number
  popularity: number
  genres?: MALGenre[]
  media_type: string
  status: string
  num_episodes: number
  start_season?: MALSeason
  broadcast?: MALBroadcast
  rating: string
  userStatus: UserAnimeStatus
  num_list_users?: number
}
