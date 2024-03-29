import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import UserDTO from "@/interfaces/services/UserService/UserDTO"
import api from "./api"
import { get, put } from "./request/request"

const UserService = {
  animelist: async () => get<MALAnime[]>(api.user.animelist),
  getCurrent: async () => get<UserDTO>(api.user.getCurrent),
  updateCurrentMalUsername: (malUsername: string) =>
    put<string, UserDTO>(api.user.updateCurrentMalUsername, malUsername)
}

export default UserService
