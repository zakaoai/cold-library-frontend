import { Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import MALCard from "../MALCard/MALCard"
import type ISeasonSection from "./interface/SeasonSection"

const SeasonSection = ({ season, items }: ISeasonSection) => {
  return (
    <>
      {season !== "null" && (
        <Typography id={season.toUpperCase()} variant="h5" component="h2" gutterBottom>
          {season}
        </Typography>
      )}
      <Grid container spacing={1}>
        {items.map(item => (
          <Grid key={item.id} lg={3} md={4} xs={12} sm={6}>
            <MALCard malAnime={item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default SeasonSection
