import Grid from "@mui/material/Grid"
import { MALCardProps } from "./MALCard"
import MALInLibraryButton from "./MALInLibraryButton"

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
