import MALCard from "@/components/MALCard/MALCard"
import useMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeList"
import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useEffect } from "react"
import MyAnimeListFilterBar from "./MyAnimeListFilterBar"

const MyAnimeListActivity = () => {
  const { myAnimeList, updateAnime } = useMyAnimeList()
  const MALFilter = useMyAnimeListFilter(myAnimeList)
  const { filteredMyAnimeList } = MALFilter

  useEffect
  const sortByTitle = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.title.localeCompare(animeB.title)
  return (
    <>
      <MyAnimeListFilterBar malAnimes={myAnimeList} malFilter={MALFilter} />

      <Grid container justifyContent="center" spacing={1}>
        {filteredMyAnimeList.sort(sortByTitle).map(anime => (
          <Grid key={anime.malId} lg={3} md={4} xs={12} sm={6}>
            <MALCard malAnime={anime} selectedGenre={MALFilter.selectedGenres} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default MyAnimeListActivity
