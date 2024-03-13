import FilterHeaderCell from "@/components/FilterHeaderCell/FilterHeaderCell"
import useAlternateTrackedTorrentEpisode from "@/hooks/containers/TrackedTorrent/Modal/useAlternateTrackedTorrentEpisode"
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

import AlternateTrackedEpisodeLine from "./AlternateTrackedEpisodeLine"
import { headCells } from "./const"

const ModalEditTrackedEpisode = () => {
  const {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes,
    selectedValue,
    updatedTrackedEpisode,
    handleClose,
    showModalAlternateEpisode,
    sortObj,
    sliceBegin,
    sliceEnd,
    paginationProps
  } = useAlternateTrackedTorrentEpisode()

  return (
    <Dialog open={showModalAlternateEpisode} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">
        Modification du Torrent episode {updatedTrackedEpisode?.episodeNumber}
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {updatedTrackedEpisode && <AlternateTrackedEpisodeLine trackedEpisode={updatedTrackedEpisode} />}
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
                {sortObj
                  .sortFunction(alternateTrackedEpisodes)
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
            {...paginationProps}
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
