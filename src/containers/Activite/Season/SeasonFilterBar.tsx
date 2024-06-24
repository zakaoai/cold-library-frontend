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

import { AnimeType } from "@/enums/AnimeType"
import { RenderMode } from "@/enums/RenderMode"
import useMyAnimeListFilterBar from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilterBar"
import useSeasonFilterBar from "@/hooks/containers/Activite/Season/useSeasonFilterBar"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
const SeasonFilterBar = () => {
  const {
    selectedGenres,
    genres,
    handleChangeGenre,
    handleClearGenre,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode
  } = useMyAnimeListFilterBar()

  const { seasonSelected, yearSelected, sortBySelected, typeSelected } = useSeasonContext()
  const { seasons, handleChangeSeason, handleChangeSortBy, handleChangeType, handleChangeYear } = useSeasonFilterBar()

  const sortBy: Record<keyof MALAnime, string> = {
    num_list_users: "Members",
    title: "Titre",
    genres: "",
    id: "",
    main_picture: "",
    start_date: "",
    end_date: "",
    mean: "",
    rank: "",
    popularity: "",
    media_type: "",
    status: "",
    num_episodes: "",
    start_season: "",
    broadcast: "",
    rating: "",
    userStatus: ""
  }

  const type: Record<AnimeType, string> = {
    [AnimeType.ALL]: "Tous",
    [AnimeType.TV]: "TV",
    [AnimeType.OVA]: "OVA",
    [AnimeType.ONA]: "ONA",
    [AnimeType.MOVIE]: "Film",
    [AnimeType.SPECIAL]: "Special",
    [AnimeType.MUSIC]: "",
    [AnimeType.UNKNOWN]: ""
  }

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} xs={12}>
            <Grid container lg={6} xs={12}>
              <Grid lg={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    autoWidth
                    labelId="type-label"
                    id="type"
                    value={typeSelected}
                    placeholder="Selectionner un Type"
                    label="Type"
                    onChange={handleChangeType}>
                    {Object.entries(type)
                      .filter(([, value]) => value.length > 0)
                      .map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
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
              <Grid lg={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="sort-label">Trie</InputLabel>
                  <Select
                    autoWidth
                    labelId="sort-label"
                    id="sort"
                    value={sortBySelected}
                    placeholder="Selectionner un trie"
                    label="Trie"
                    onChange={handleChangeSortBy}>
                    {Object.entries(sortBy)
                      .filter(([, value]) => value.length > 0)
                      .map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid lg={3} xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Année</InputLabel>
                  <Select
                    autoWidth
                    labelId="year-label"
                    id="year"
                    value={yearSelected}
                    placeholder="Selectionner une année"
                    label="Année"
                    onChange={handleChangeYear}>
                    {seasons?.map(({ year }) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid lg={3} xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="season-label">Saison</InputLabel>
                  <Select
                    autoWidth
                    labelId="season-label"
                    id="season"
                    value={seasonSelected}
                    placeholder="Selectionner une Saison"
                    label="Saison"
                    onChange={handleChangeSeason}>
                    {seasons
                      ?.find(a => a.year === yearSelected)
                      ?.seasons?.map(season => (
                        <MenuItem key={season} value={season}>
                          {season}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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

export default SeasonFilterBar
