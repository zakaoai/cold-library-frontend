import api from "@/services/api"
import { HttpResponse, http } from "msw"
import generateMALAnime from "./MALAnimeFactory"

const malAnimeList = Array.from({ length: 50 }, () => generateMALAnime())

export const mockedAnimeList = http.get(api.user.animelist, () => HttpResponse.json(malAnimeList))
