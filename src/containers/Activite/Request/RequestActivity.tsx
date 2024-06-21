import RequestStatus from "@/enums/RequestStatus"
import type RequestType from "@/enums/RequestType"
import useRequest from "@/hooks/containers/Activite/Request/useRequest"
import usePagination from "@/hooks/usePagination"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove"
import PendingIcon from "@mui/icons-material/Pending"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { TablePagination } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Tooltip from "@mui/material/Tooltip"
import { format } from "date-fns/format"
import { useCallback } from "react"

const RequestActivity = () => {
  const { requests, updateRequest } = useRequest()
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination<RequestDTO>(requests ?? [])

  const renderRequestState = useCallback(
    (requestStatus: RequestStatus) =>
      ({
        PENDING: (
          <Tooltip title="En Attente">
            <PendingIcon />
          </Tooltip>
        ),
        REJECTED: (
          <Tooltip title="Rejeté">
            <ThumbDownIcon />
          </Tooltip>
        ),
        ACCEPTED: (
          <Tooltip title="Accepté">
            <ThumbUpIcon />
          </Tooltip>
        )
      })[requestStatus],
    []
  )

  const renderRequestType = useCallback(
    (requestType: RequestType) =>
      ({
        MOVE_TO_SERVER: (
          <Tooltip title="Bouger vers le serveur">
            <DriveFileMoveIcon />
          </Tooltip>
        ),
        ADD_TO_SERVER: (
          <Tooltip title="Ajouter au serveur">
            <CreateNewFolderIcon />
          </Tooltip>
        )
      })[requestType],
    []
  )

  const requestRender = useCallback(
    (request: RequestDTO) => (
      <TableRow key={request.id}>
        <TableCell>
          <a href={`https://myanimelist.net/anime/${request.malId}`} target="_blank" rel="noreferrer">
            <img srcSet={`${request?.malImg} 318w`} sizes="70px" alt={request.animeTitle} loading="lazy" />
          </a>
        </TableCell>
        <TableCell>{request.animeTitle} </TableCell>
        <TableCell>{renderRequestType(request.type)} </TableCell>
        <TableCell>{Array.isArray(request.date) && format(new Date(...request.date), "dd/MM/yyyy HH:mm:ss")}</TableCell>
        <TableCell>{renderRequestState(request.state)} </TableCell>
        <TableCell>{request.creator} </TableCell>
        <TableCell>{request.assignedUser} </TableCell>
        <TableCell>
          {request.state === RequestStatus.PENDING ? (
            <>
              <IconButton
                color="success"
                onClick={() => {
                  updateRequest({ ...request, state: RequestStatus.ACCEPTED })
                }}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  updateRequest({ ...request, state: RequestStatus.REJECTED })
                }}>
                <ThumbDownIcon />
              </IconButton>
            </>
          ) : undefined}
        </TableCell>
      </TableRow>
    ),
    [renderRequestState, renderRequestType]
  )

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell> Titre </TableCell>
              <TableCell> Type </TableCell>
              <TableCell> Date </TableCell>
              <TableCell> State </TableCell>
              <TableCell> Createur </TableCell>
              <TableCell> Assigné </TableCell>
              <TableCell> Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{requests?.slice(sliceBegin, sliceEnd)?.map(requestRender)}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={labelTemplate}
        />
      </TableContainer>
    </>
  )
}

export default RequestActivity
