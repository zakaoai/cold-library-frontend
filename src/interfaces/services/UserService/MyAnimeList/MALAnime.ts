import MALBroadcast from "./MALBroadcast"
import MALGenre from "./MALGenre"
import MALPicture from "./MALPicture"
import MALSeason from "./MALSeason"

export default interface MALAnime {
  id: number
  title: string
  main_picture: MALPicture
  start_date?: string
  end_date?: string
  mean: number
  rank: number
  popularity: number
  genres: MALGenre[]
  media_type: string
  status: string
  num_episodes: number
  start_season?: MALSeason
  broadcast?: MALBroadcast
  rating: string
  userStatus?: string
}
