import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import { useCallback } from "react"

export interface MyAnimeListFilterBarProps {
  malAnimes: (Omit<MALAnime, "broadcast"> & AnimeDTO)[]
  malFilter: ReturnType<typeof useMyAnimeListFilter>
}

const MyAnimeListFilterBar = ({ malAnimes, malFilter }: MyAnimeListFilterBarProps) => {
  const { setuserStatusFilter, setSelectedGenres } = malFilter

  const statusValues = [
    { value: "ALL", label: "Tous" },
    { value: "watching", label: "Watching" },
    { value: "completed", label: "Completed" },
    { value: "on_hold", label: "On Hold" },
    { value: "dropped", label: "Dropped" },
    { value: "plan_to_watch", label: "Plan To Watch" }
  ]

  const handleClearGenre = useCallback(() => {
    setSelectedGenres(Array<string>(0))
  }, [setSelectedGenres])

  const handleChangeStatus = useCallback(
    (event: SelectChangeEvent) => {
      const {
        target: { value }
      } = event
      setuserStatusFilter(value)
    },
    [setuserStatusFilter]
  )

  const handleChangeGenre = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const {
        target: { value }
      } = event
      setSelectedGenres(typeof value === "string" ? value.split(",") : value)
    },
    [setSelectedGenres]
  )
  const genres = malAnimes
    .flatMap(({ genres }) => genres)
    .filter((genre, idx, arr) => arr.findIndex(a => a.id === genre.id) === idx)

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              autoWidth
              labelId="status-label"
              id="status"
              value={malFilter.userStatusFilter}
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
          <FormControl>
            <InputLabel id="rarity-label">Genre</InputLabel>
            <Select
              autoWidth
              endAdornment={
                <IconButton size="small" onClick={handleClearGenre} sx={{ display: genres.length > 0 ? "" : "none" }}>
                  <ClearIcon />
                </IconButton>
              }
              sx={{ "& .MuiSelect-iconOutlined": { display: genres.length > 0 ? "none" : "" } }}
              labelId="rarity-label"
              multiple
              value={malFilter.selectedGenres}
              onChange={handleChangeGenre}
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
                    <Checkbox checked={malFilter.selectedGenres.indexOf(genre.name) > -1} />
                    <ListItemText primary={genre.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default MyAnimeListFilterBar
