import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import useMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeList"
import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { Grid } from "@mui/material"
import MyAnimeListFilterBar from "./MyAnimeListFilterBar"

const MyAnimeListActivity = () => {
  const { myAnimeList, updateAnime } = useMyAnimeList()

  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  const sortByTitle = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.title.localeCompare(animeB.title)
  return (
    <>
      <MyAnimeListFilterBar filtersState={filtersState} />

      <Grid container justifyContent="center" spacing={1}>
        {myAnimeList.sort(sortByTitle).map(anime => (
          <Grid key={anime.malId} item lg={3} md={4} xs={12} sm={6}>
            <AnimeCardProvider
              anime={anime}
              showEpisodeLink={!(anime.storageState == null)}
              updateAnime={updateAnime}
              showAddOrRemoveFromLibrary>
              <AnimeCardComponent />
            </AnimeCardProvider>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default MyAnimeListActivity
