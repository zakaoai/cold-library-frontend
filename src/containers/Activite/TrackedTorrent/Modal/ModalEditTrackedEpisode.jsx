import FilterHeaderCell from "@/components/FilterHeaderCell/FilterHeaderCell"
import useAlternateTrackedTorrentEpisode from "@/hooks/containers/TrackedTorrent/Modal/useAlternateTrackedTorrentEpisode"
import useSortTable from "@/hooks/containers/TrackedTorrent/Modal/useSortTable"
import usePagination from "@/hooks/usePagination"
import { TablePagination } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import { useAnimeTorrentRowContext } from "@/hooks/context/useAnimeTorrentRowContext"
import { useCallback } from "react"
import AlternateTrackedEpisodeLine from "./AlternateTrackedEpisodeLine"

const ModalEditTrackedEpisode = () => {
  const {
    setShowModalAlternateEpisode,
    setSelectedEpisodeAlternate,
    selectedEpisodeAlternate,
    showModalAlternateEpisode
  } = useAnimeTorrentRowContext()

  const handleClose = useCallback(() => {
    setShowModalAlternateEpisode(false)
    setSelectedEpisodeAlternate(undefined)
  }, [setShowModalAlternateEpisode, setSelectedEpisodeAlternate])

  const { episodeNumber } = selectedEpisodeAlternate
  const { handleChange, handleModifier, alternateTrackedEpisodes, selectedValue, updatedTrackedEpisode } =
    useAlternateTrackedTorrentEpisode(
      selectedEpisodeAlternate,

      handleClose
    )

  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, labelTemplate, sliceBegin, sliceEnd } =
    usePagination(alternateTrackedEpisodes)

  const sortObj = useSortTable()
  const { sortFunction } = sortObj

  const headCells = [
    { id: "empty", filter: false },
    { id: "title", filter: true, label: "Titre" },
    { id: "dateObj", filter: true, label: "Date" },
    { id: "byteSize", filter: true, label: "Size" },
    { id: "traffic", label: "Traffic" },
    { id: "infos", label: "Infos" }
  ]

  return (
    <Dialog open={showModalAlternateEpisode} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">Modification du Torrent episode {episodeNumber}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <AlternateTrackedEpisodeLine trackedEpisode={updatedTrackedEpisode} />
            </TableBody>
          </Table>
        </TableContainer>
        <Paper sx={{ width: "100%", marginBottom: "16px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {headCells.map(cell => (
                    <FilterHeaderCell key={cell.id} {...cell} {...sortObj} />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortFunction(alternateTrackedEpisodes)
                  .slice(sliceBegin, sliceEnd)
                  .map(trackedEpisode => (
                    <AlternateTrackedEpisodeLine
                      trackedEpisode={trackedEpisode}
                      key={`track-${trackedEpisode.torrentId}`}
                      selectedValue={selectedValue}
                      handleChange={handleChange}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={alternateTrackedEpisodes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={labelTemplate}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleModifier} color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalEditTrackedEpisode
