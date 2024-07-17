import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import type { UseMutateFunction } from "@tanstack/react-query"

export default interface AnimeRowBottomAction {
  updateAnime: (updatedAnime: AnimeDTO | AnimeInServerDTO) => void
  showAddOrRemoveFromLibrary?: boolean
  request: RequestDTO | undefined
  createRequest: UseMutateFunction<RequestDTO, ResponseError, RequestInputDTO>
  anime: AnimeDTO
}
