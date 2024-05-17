import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { type PropsWithChildren } from "react"
const GridComponent = ({ children }: PropsWithChildren) => (
  <Grid container spacing={1}>
    {children}
  </Grid>
)

export default GridComponent
