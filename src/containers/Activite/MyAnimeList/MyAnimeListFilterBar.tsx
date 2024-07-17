import { Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import GenreForm from "@/components/GenreForm/GenreForm"
import RenderButtons from "@/components/RenderButtons/RenderButtons"
import ViewButtons from "@/components/ViewButtons/ViewButtons"
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
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} size={{ xs: 12 }}>
            <Grid container size={{ lg: 6, xs: 12 }}>
              <Grid size={{ lg: 4, xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    autoWidth
                    labelId="status-label"
                    id="status"
                    value={userStatusFilter}
                    label="Status"
                    onChange={handleChangeStatus}>
                    <MenuItem disabled value="">
                      <em>Selectionner un status</em>
                    </MenuItem>
                    {statusValues.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ lg: 8, xs: 12 }}>
                <GenreForm
                  selectedGenres={selectedGenres}
                  handleClearGenre={handleClearGenre}
                  handleChangeGenre={handleChangeGenre}
                  onCloseGenre={onCloseGenre}
                  genres={genres}
                />
              </Grid>
            </Grid>
            <Grid size={{ lg: 6, xs: 12 }} container display="flex" justifyContent={"end"}>
              <ViewButtons handleChangeViewMode={handleChangeViewMode} selectedViewMode={selectedViewMode} />
              <RenderButtons handleChangeRenderMode={handleChangeRenderMode} selectedRenderMode={selectedRenderMode} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MyAnimeListFilterBar
