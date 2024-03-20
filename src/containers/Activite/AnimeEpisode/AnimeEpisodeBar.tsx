import type IAnimeEpisodeBar from "@/interfaces/containers/Activite/AnimeEpisode/AnimeEpisodeBar"
import SearchIcon from "@mui/icons-material/Search"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

const AnimeEpisodeBar = ({ update }: IAnimeEpisodeBar) => {
  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Grid container alignItems="center">
          <Grid item>
            <Button variant="outlined" onClick={update} startIcon={<SearchIcon />}>
              Update Anime Infos
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default AnimeEpisodeBar
