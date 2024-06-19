import type RequestStatus from "@/enums/RequestStatus"
import type RequestType from "@/enums/RequestType"

export default interface RequestInputDTO {
  id?: number
  malId: number
  type: RequestType
  state: RequestStatus
  userId?: string
  assignedUserId?: string
}
