import type IAnimeEpisodeBar from "@/interfaces/containers/Activite/AnimeEpisode/AnimeEpisodeBar"
import SearchIcon from "@mui/icons-material/Search"
import { AppBar, Box, Button, Grid } from "@mui/material"

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
