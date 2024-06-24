import type Season from "@/enums/Season"
import type SeasonEntry from "@/interfaces/services/SeasonService/SeasonEntry"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import api from "./api"
import { get } from "./request/request"

const SeasonService = {
  getSeasonsList: async () => await get<SeasonEntry[]>(api.seasons.getSeasonsList),
  getSeason: async (year: number, season: Season) => await get<MALAnime[]>(api.seasons.getSeason(year, season))
}

export default SeasonService
