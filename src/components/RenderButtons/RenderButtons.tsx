import ViewListIcon from "@mui/icons-material/ViewList"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import Grid from "@mui/material/Grid"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { RenderMode } from "@/enums/RenderMode"

import type IRenderButtons from "./interface/RenderButtons"

const RenderButtons = ({ handleChangeRenderMode, selectedRenderMode }: IRenderButtons) => (
  <Grid>
    <ToggleButtonGroup exclusive onChange={handleChangeRenderMode} value={selectedRenderMode}>
      <ToggleButton value={RenderMode.LIST}>
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value={RenderMode.CARD}>
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  </Grid>
)
export default RenderButtons
