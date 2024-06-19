import type useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import type ResponseError from "@/interfaces/services/ResponseError"
import { type UseMutateFunction } from "@tanstack/react-query"

export default interface AnimeCardContext {
  anime: AnimeDTO
  showEpisodeLink: boolean
  imageHeight: string
  showAddOrRemoveFromLibrary: boolean
  updateAnimeState: ReturnType<typeof useUpdateAnimeState>
  request: RequestDTO | undefined
  createRequest: UseMutateFunction<RequestDTO, ResponseError, RequestInputDTO, unknown>
}
