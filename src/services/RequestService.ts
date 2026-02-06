import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import api from "./api"
import { deleteRequest, get, post } from "./request/request"

const RequestService = {
  create: async (requestInput: RequestInputDTO) =>
    await post<RequestInputDTO, RequestDTO>(api.request.create, requestInput),
  getMe: async () => await get<RequestDTO[]>(api.request.getMe),
  getAssigned: async () => await get<RequestDTO[]>(api.request.getAssigned),
  getAll: async () => await get<RequestDTO[]>(api.request.getAll),
  update: async (requestInput: RequestInputDTO & Pick<Required<RequestInputDTO>, "id">) =>
    await post<RequestInputDTO, RequestDTO>(api.request.update(requestInput.id), requestInput),
  delete: async (requestId: number) => await deleteRequest(api.request.delete(requestId))
}

export default RequestService
