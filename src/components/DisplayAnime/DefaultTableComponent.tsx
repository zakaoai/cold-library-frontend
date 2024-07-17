import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import type { PropsWithChildren } from "react"

const DefaultTableComponent = (hasGenre = false, hasEmptyCell = false) =>
  function renderTableComponent({ children }: PropsWithChildren) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {hasEmptyCell && <TableCell sx={{ paddingX: "5px" }} padding="none" />}
              <TableCell />
              <TableCell sx={{ maxWidth: { lg: "440px" } }}>Title</TableCell>
              <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
                Type
              </TableCell>
              {hasGenre && <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Genre</TableCell>}
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    )
  }

export default DefaultTableComponent
