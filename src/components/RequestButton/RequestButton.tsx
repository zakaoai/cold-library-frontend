import IconButton from "@mui/material/IconButton"

import RequestStatus from "@/enums/RequestStatus"
import RequestType from "@/enums/RequestType"
import StorageState from "@/enums/StorageState"
import type RequestInputDTO from "@/interfaces/services/RequestService/RequestInputDTO"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import { useMemo } from "react"
import type IRequestButton from "./interface/RequestButton"

const RequestButton = ({ animeInServer, request, createRequest }: IRequestButton) => {
  const { storageState } = animeInServer
  const createRequestInput: RequestInputDTO = useMemo(
    () => ({
      malId: animeInServer.malId,
      type: storageState === StorageState.FLUX_FROID ? RequestType.MOVE_TO_SERVER : RequestType.ADD_TO_SERVER,
      state: RequestStatus.PENDING
    }),
    [animeInServer.malId, storageState]
  )

  return (
    <IconButton
      disabled={request !== undefined || storageState === StorageState.FLUX_CHAUD}
      title="Creer une request"
      onClick={() => {
        createRequest(createRequestInput)
      }}
      size="large">
      <LibraryAddIcon />
    </IconButton>
  )
}

export default RequestButton
