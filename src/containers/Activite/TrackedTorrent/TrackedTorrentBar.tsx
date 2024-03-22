import useAnimeTorrentsAction from "@/hooks/containers/TrackedTorrent/useAnimeTorrentsAction"
import { useAnimeTorrentContext } from "@/hooks/context/useAnimeTorrentContext"
import SearchIcon from "@mui/icons-material/Search"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { useCallback } from "react"

const TrackedTorrentBar = () => {
  const { setDoScan, setDoScanNext } = useAnimeTorrentContext()
  const { isUpdateAllDelugePending, updateAllDeluge } = useAnimeTorrentsAction()

  const scanAll = useCallback(() => {
    setDoScan(a => !a)
  }, [setDoScan])

  const scanNext = useCallback(() => {
    setDoScanNext(a => !a)
  }, [setDoScanNext])

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <Button variant="outlined" onClick={scanAll} startIcon={<SearchIcon />}>
              Scan All
            </Button>
            <Button variant="outlined" onClick={scanNext} startIcon={<SearchIcon />}>
              Scan Next
            </Button>
            <Button
              variant="outlined"
              onClick={() => updateAllDeluge()}
              disabled={isUpdateAllDelugePending}
              startIcon={<WaterDropIcon />}>
              Update Deluge
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default TrackedTorrentBar
