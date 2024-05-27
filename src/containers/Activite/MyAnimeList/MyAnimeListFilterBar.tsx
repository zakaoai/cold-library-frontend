import AbcIcon from "@mui/icons-material/Abc"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ClearIcon from "@mui/icons-material/Clear"
import ViewListIcon from "@mui/icons-material/ViewList"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import { IconButton, Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select from "@mui/material/Select"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Grid from "@mui/material/Unstable_Grid2"

import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import useMyAnimeListFilterBar from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilterBar"
import { statusValues } from "./const"
const MyAnimeListFilterBar = () => {
  const {
    selectedGenres,
    genres,
    handleChangeGenre,
    handleClearGenre,
    handleChangeStatus,
    userStatusFilter,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode,
    handleChangeViewMode,
    selectedViewMode
  } = useMyAnimeListFilterBar()

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} xs={12}>
            <Grid container lg={6} xs={12}>
              <Grid lg={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    autoWidth
                    labelId="status-label"
                    id="status"
                    value={userStatusFilter}
                    placeholder="Selectionner un status"
                    label="Status"
                    onChange={handleChangeStatus}>
                    {statusValues.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid lg={8} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="rarity-label">Genre</InputLabel>
                  <Select
                    autoWidth
                    endAdornment={
                      <IconButton
                        size="small"
                        onClick={handleClearGenre}
                        sx={{ display: selectedGenres.length > 0 ? "" : "none" }}>
                        <ClearIcon />
                      </IconButton>
                    }
                    sx={{ "& .MuiSelect-iconOutlined": { display: selectedGenres.length > 0 ? "none" : "" } }}
                    labelId="rarity-label"
                    multiple
                    value={selectedGenres}
                    onChange={handleChangeGenre}
                    onClose={onCloseGenre}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected: string[]) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}>
                    {Array.from(genres)
                      .toSorted((a, b) => a.name.localeCompare(b.name))
                      .map(genre => (
                        <MenuItem key={genre.id} value={genre.name}>
                          <Checkbox checked={selectedGenres.includes(genre.name)} />
                          <ListItemText primary={genre.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container lg={6} xs={12} display="flex" justifyContent={"end"}>
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MyAnimeListFilterBar
