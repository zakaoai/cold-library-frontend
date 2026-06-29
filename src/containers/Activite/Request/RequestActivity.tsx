import InLibraryStateButtonGeneric from "@/components/InLibraryStateButtonGeneric/InLibraryStateButtonGeneric"
import withAuthorization from "@/components/Secure/withAuthorization"
import RequestStatus from "@/enums/RequestStatus"
import type RequestType from "@/enums/RequestType"
import useUpdateAnimeStorageStateLight from "@/hooks/components/useUpdateAnimeStorageStateLight"
import useRequestActivity from "@/hooks/containers/Activite/Request/useRequestActivity"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import useUserContext from "@/hooks/context/useUserContext"
import usePagination from "@/hooks/usePagination"
import type { RequestFilters } from "@/interfaces/containers/Activite/Request/RequestFilters"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import { formatJavaLocalDateTimeArray } from "@/utils/dateUtils"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import DeleteIcon from "@mui/icons-material/Delete"
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove"
import PendingIcon from "@mui/icons-material/Pending"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Tooltip from "@mui/material/Tooltip"
import { useCallback, useState } from "react"
import { NavLink } from "react-router"
import RequestFilterBar from "./RequestFilterBar"

const RequestActivity = () => {
  const { requests, updateRequest, deleteRequest } = useRequestActivity()
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination<RequestDTO>(requests ?? [])
  const { animes } = useLibrary()
  const { updateAnime } = useUpdateAnimeStorageStateLight()
  const { user, isAdmin } = useUserContext()

  const [filter, setFilter] = useState<RequestFilters>({ status: undefined, type: undefined })

  const filterFunction = useCallback(
    (request: RequestDTO) => {
      if (filter.status && request.state !== filter.status) return false
      if (filter.type && request.type !== filter.type) return false
      return true
    },
    [filter]
  )

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

  const adminActions = withAuthorization(
    ({ request, animeInServer }: { request: RequestDTO; animeInServer: AnimeDTO | undefined }) => (
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
        <InLibraryStateButtonGeneric anime={{ ...(animeInServer ?? {}), ...request }} updateAnime={updateAnime} />
      </>
    ),
    { minLevel: "admin" }
  )

  const userActions = withAuthorization(
    ({ request }: { request: RequestDTO }) =>
      isAdmin || request.creator === user?.name ? (
        <IconButton
          color="error"
          onClick={() => {
            deleteRequest(request.id)
          }}>
          <DeleteIcon />
        </IconButton>
      ) : undefined,
    { minLevel: "user" }
  )

  const requestRender = useCallback(
    (request: RequestDTO) => {
      const animeInServer = animes.find(({ malId }) => request.malId === malId)
      return (
        <TableRow key={request.id}>
          <TableCell>
            <a href={`https://myanimelist.net/anime/${request.malId}`} target="_blank" rel="noreferrer">
              <img srcSet={`${request.malImg} 318w`} sizes="70px" alt={request.animeTitle} loading="lazy" />
            </a>
          </TableCell>
          <TableCell>
            {animeInServer !== undefined ? (
              <Link to={`/app/anime/${request.malId}`} component={NavLink}>
                {request.animeTitle}
              </Link>
            ) : (
              request.animeTitle
            )}
          </TableCell>
          <TableCell>{renderRequestType(request.type)} </TableCell>
          <TableCell>{formatJavaLocalDateTimeArray(request.date)}</TableCell>
          <TableCell>{renderRequestState(request.state)} </TableCell>
          <TableCell>{request.creator} </TableCell>
          <TableCell>{request.assignedUser} </TableCell>
          <TableCell>
            {request.state === RequestStatus.PENDING ? adminActions({ request, animeInServer }) : undefined}
            {userActions({ request })}
          </TableCell>
        </TableRow>
      )
    },
    [animes, renderRequestState, renderRequestType, updateAnime, updateRequest]
  )

  return (
    <>
      <RequestFilterBar onFilterChange={setFilter} />
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
          <TableBody>
            {requests.toReversed().filter(filterFunction).slice(sliceBegin, sliceEnd).map(requestRender)}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.length ?? 0}
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
