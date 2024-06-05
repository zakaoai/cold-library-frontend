import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import api from "./api"
import { get, put } from "./request/request"

const UserService = {
  animelist: async () => await get<MALAnime[]>(api.user.animelist),
  getCurrent: async () => await get<UserDTO>(api.user.getCurrent),
  updateCurrentMalUsername: async (malUsername: string) =>
    await put<string, UserDTO>(api.user.updateCurrentMalUsername, malUsername),
  me: async () => await get<UserDTO>(api.user.me),
  getAll: async () => await get<UserDTO[]>(api.user.getAll)
}

export default UserService
