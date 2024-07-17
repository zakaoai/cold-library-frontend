import useAdminLog from "@/hooks/containers/Activite/AdminLog/useAdminLog"
import usePagination from "@/hooks/usePagination"
import type LogDTO from "@/interfaces/services/LogService/LogDTO"
import { formatJavaLocalDateTimeArray } from "@/utils/dateUtils"
import { TablePagination } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useCallback, useMemo } from "react"
import AdminLogAppBar from "./AdminLogAppBar"

const AdminLogActivity = () => {
  const { logs, users, selectedUser, handleChangeSelectedUser, userLogs } = useAdminLog()
  const displayedLogs = useMemo(
    () => (selectedUser === undefined ? (logs ?? []) : userLogs),
    [logs, selectedUser, userLogs]
  )
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination<LogDTO>(displayedLogs)

  const logRender = useCallback(
    (log: LogDTO) => (
      <TableRow key={log.id}>
        <TableCell>{log.id} </TableCell>
        <TableCell>{log.action} </TableCell>
        <TableCell>{formatJavaLocalDateTimeArray(log.date)} </TableCell>
        <TableCell>{log.userId} </TableCell>
        <TableCell>{log.name} </TableCell>
        <TableCell>{log.email} </TableCell>
      </TableRow>
    ),
    []
  )

  return (
    <>
      <AdminLogAppBar users={users} selectedUser={selectedUser} handleChangeSelectedUser={handleChangeSelectedUser} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Id </TableCell>
              <TableCell> Action </TableCell>
              <TableCell> Date </TableCell>
              <TableCell> UserId </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Email </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayedLogs.slice(sliceBegin, sliceEnd).map(logRender)}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayedLogs.length ?? 0}
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

export default AdminLogActivity
