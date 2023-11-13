import { useTrackedTorrentContext } from "@/context/TrackedTorrentContext"
import SearchIcon from "@mui/icons-material/Search"
import { AppBar, Box, Button, Grid } from "@mui/material"
import { useCallback } from "react"

const TrackedTorrentBar = () => {
  const { setDoScan, setDoScanNext } = useTrackedTorrentContext()

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
            <Button
              variant="outlined"
              onClick={() => {
                scanAll()
              }}
              startIcon={<SearchIcon />}>
              Scan All
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                scanNext()
              }}
              startIcon={<SearchIcon />}>
              Scan Next
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default TrackedTorrentBar
