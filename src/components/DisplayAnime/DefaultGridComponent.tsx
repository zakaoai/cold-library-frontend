import Grid from "@mui/material/Grid" // Grid version 2
import type { PropsWithChildren } from "react"

const DefaultGridComponent = ({ children }: PropsWithChildren) => (
  <Grid container spacing={1}>
    {children}
  </Grid>
)

export default DefaultGridComponent
