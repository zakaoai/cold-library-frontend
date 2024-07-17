import { Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import useDisplayAnimeFilterBar from "@/components/DisplayAnime/hooks/useDisplayAnimeFilterBar"
import GenreForm from "@/components/GenreForm/GenreForm"
import RenderButtons from "@/components/RenderButtons/RenderButtons"
import { AnimeType } from "@/enums/AnimeType"
import useSeasonFilterBar from "@/hooks/containers/Activite/Season/useSeasonFilterBar"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import type MALGenre from "@/interfaces/services/UserService/MyAnimeList/MALGenre"
const SeasonFilterBar = ({ genres }: { genres: MALGenre[] }) => {
  const {
    selectedGenres,
    handleChangeGenre,
    handleClearGenre,
    onCloseGenre,
    handleChangeRenderMode,
    selectedRenderMode
  } = useDisplayAnimeFilterBar()

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
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} size={{ xs: 12 }}>
            <Grid container size={{ lg: 6, xs: 12 }}>
              <Grid size={{ lg: 3, xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    autoWidth
                    labelId="type-label"
                    id="type"
                    value={typeSelected}
                    label="Type"
                    onChange={handleChangeType}>
                    <MenuItem disabled value="">
                      <em>Selectionner un Type</em>
                    </MenuItem>
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
              <Grid size={{ lg: 3, xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="sort-label">Trie</InputLabel>
                  <Select
                    autoWidth
                    labelId="sort-label"
                    id="sort"
                    value={sortBySelected}
                    label="Trie"
                    onChange={handleChangeSortBy}>
                    <MenuItem disabled value="">
                      <em>Selectionner un trie</em>
                    </MenuItem>
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
              <Grid size={{ lg: 3, xs: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Année</InputLabel>
                  <Select
                    autoWidth
                    labelId="year-label"
                    id="year"
                    value={yearSelected}
                    label="Année"
                    onChange={handleChangeYear}>
                    <MenuItem disabled value="">
                      <em>Selectionner une année</em>
                    </MenuItem>
                    {(seasons ?? [{ year: yearSelected }]).map(({ year }) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ lg: 3, xs: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="season-label">Saison</InputLabel>
                  <Select
                    autoWidth
                    labelId="season-label"
                    id="season"
                    value={seasonSelected}
                    label="Saison"
                    onChange={handleChangeSeason}>
                    <MenuItem disabled value="">
                      <em>Selectionner une Saison</em>
                    </MenuItem>
                    {(seasons ?? [{ year: yearSelected, seasons: [seasonSelected] }])
                      .find(a => a.year === yearSelected)
                      ?.seasons.map(season => (
                        <MenuItem key={season} value={season}>
                          {season}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <RenderButtons handleChangeRenderMode={handleChangeRenderMode} selectedRenderMode={selectedRenderMode} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SeasonFilterBar
