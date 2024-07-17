import ClearIcon from "@mui/icons-material/Clear"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select from "@mui/material/Select"
import type IGenreForm from "./interface/GenreForm"

const GenreForm = ({ selectedGenres, handleClearGenre, handleChangeGenre, onCloseGenre, genres }: IGenreForm) => (
  <FormControl fullWidth>
    <InputLabel id="rarity-label">Genre</InputLabel>
    <Select
      autoWidth
      endAdornment={
        <IconButton size="small" onClick={handleClearGenre} sx={{ display: selectedGenres.length > 0 ? "" : "none" }}>
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
)

export default GenreForm
