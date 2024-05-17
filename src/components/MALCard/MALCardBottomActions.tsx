import Grid from "@mui/material/Grid"
import MALInLibraryButton from "./MALInLibraryButton"
import type MALCardProps from "./interface/MALCardProps"

const MALCardBottomActions = ({ malAnime }: MALCardProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <MALInLibraryButton malAnime={malAnime} />
      </Grid>
    </Grid>
  )
}

export default MALCardBottomActions
