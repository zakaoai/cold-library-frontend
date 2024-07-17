import AbcIcon from "@mui/icons-material/Abc"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Grid from "@mui/material/Grid"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { ViewMode } from "@/enums/ViewMode"
import type IViewButtons from "./interface/ViewButtons"

const ViewButtons = ({ handleChangeViewMode, selectedViewMode }: IViewButtons) => (
  <Grid>
    <ToggleButtonGroup exclusive onChange={handleChangeViewMode} value={selectedViewMode}>
      <ToggleButton value={ViewMode.DEFAULT}>Default</ToggleButton>
      <ToggleButton value={ViewMode.ALPHA}>
        <AbcIcon />
      </ToggleButton>
      <ToggleButton value={ViewMode.SEASON}>
        <CalendarMonthIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  </Grid>
)

export default ViewButtons
