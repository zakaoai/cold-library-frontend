import type LogDTO from "@/interfaces/services/LogService/LogDTO"
import api from "./api"
import { get } from "./request/request"

const LogService = {
  getAll: async () => await get<LogDTO[]>(api.log.getAll),
  getByUser: async (userId: string) => await get<LogDTO[]>(api.log.getByUserId(userId))
}

export default LogService
