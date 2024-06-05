import useAdminLog from "@/hooks/containers/Activite/AdminLog/useAdminLog"
import usePagination from "@/hooks/usePagination"
import type LogDTO from "@/interfaces/services/LogService/LogDTO"
import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, TablePagination, Toolbar } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Grid from "@mui/material/Unstable_Grid2"
import { format } from "date-fns/format"
import { useCallback, useMemo } from "react"

const AdminLogActivity = () => {
  const { logs, users, selectedUser, handleChangeSelectedUser, userLogs } = useAdminLog()
  const displayedLogs = useMemo(
    () => (selectedUser === undefined ? logs ?? [] : userLogs),
    [logs, selectedUser, userLogs]
  )
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination<LogDTO>(displayedLogs)

  const logRender = useCallback(
    (log: LogDTO) => (
      <TableRow key={log.id}>
        <TableCell>{log.id} </TableCell>
        <TableCell>{log.action} </TableCell>
        <TableCell>{Array.isArray(log.date) && format(new Date(...log.date), "dd/MM/yyyy HH:mm:ss")} </TableCell>
        <TableCell>{log.userId} </TableCell>
        <TableCell>{log.name} </TableCell>
        <TableCell>{log.email} </TableCell>
      </TableRow>
    ),
    []
  )

  return (
    <>
      <Box mb={1}>
        <AppBar position="relative" color="transparent">
          <Toolbar>
            <Grid container spacing={2} justifyContent="space-between" display={"flex"} xs={12}>
              <Grid>
                <FormControl fullWidth>
                  <InputLabel id="select-user-label">User</InputLabel>
                  <Select
                    labelId="select-user-label"
                    id="select-user"
                    value={selectedUser?.id ?? "all"}
                    label="User"
                    onChange={handleChangeSelectedUser}>
                    <MenuItem value={"all"}>Tous</MenuItem>
                    {users?.map(a => (
                      <MenuItem key={a.id} value={a.id}>
                        {a.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
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
          <TableBody>{displayedLogs?.slice(sliceBegin, sliceEnd)?.map(logRender)}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayedLogs?.length ?? 0}
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
