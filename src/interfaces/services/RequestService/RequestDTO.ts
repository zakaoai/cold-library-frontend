import type RequestStatus from "@/enums/RequestStatus"
import type RequestType from "@/enums/RequestType"

export default interface RequestDTO {
  id: number
  malId: number
  animeTitle: string
  malImg?: string
  type: RequestType
  state: RequestStatus
  date: [number, number, number, number, number]
  creator: string
  assignedUser?: string
}
