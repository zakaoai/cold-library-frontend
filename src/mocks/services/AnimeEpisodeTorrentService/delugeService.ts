import api from "@/services/api"
import { HttpResponse, http } from "msw"
import generateDelugeResponse from "./DelugeFactory"

export const mockedDelugeDownload = http.get(
  api.animeTorrentEpisode.delugeDownload(9999, 8888).replace("9999", ":malId").replace("8888", ":epNumber"),
  () => HttpResponse.json(generateDelugeResponse())
)

export const mockedDelugeUpdate = http.get(
  api.animeTorrentEpisode.delugeUpdate(9999, 8888).replace("9999", ":malId").replace("8888", ":epNumber"),
  () => HttpResponse.json(generateDelugeResponse())
)
