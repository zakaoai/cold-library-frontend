import useRequest from "@/hooks/containers/Activite/Request/useRequest"
import usePagination from "@/hooks/usePagination"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import { TablePagination } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { format } from "date-fns/format"
import { useCallback } from "react"

const RequestActivity = () => {
  const { requests } = useRequest()
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination<RequestDTO>(requests ?? [])

  const requestRender = useCallback(
    (request: RequestDTO) => (
      <TableRow key={request.id}>
        <TableCell>
          <a href={`https://myanimelist.net/anime/${request.malId}`} target="_blank" rel="noreferrer">
            <img srcSet={`${request?.malImg} 318w`} sizes="70px" alt={request.animeTitle} loading="lazy" />
          </a>
        </TableCell>
        <TableCell>{request.animeTitle} </TableCell>
        <TableCell>{request.type} </TableCell>
        <TableCell>{Array.isArray(request.date) && format(new Date(...request.date), "dd/MM/yyyy HH:mm:ss")}</TableCell>
        <TableCell>{request.state} </TableCell>
        <TableCell>{request.creator} </TableCell>
        <TableCell>{request.assignedUser} </TableCell>
      </TableRow>
    ),
    []
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
