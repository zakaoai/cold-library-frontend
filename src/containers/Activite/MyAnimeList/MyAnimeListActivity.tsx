import AlphabetRender from "@/components/AlphabeticalRender/AlphabetRender"
import MALCard from "@/components/MALCard/MALCard"
import SeasonRender from "@/components/SeasonRender/SeasonRender"
import MyAnimeListProvider from "@/context/MyAnimeListProvider"
import useMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeList"
import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import MyAnimeListFilterBar from "./MyAnimeListFilterBar"
import { ViewMode } from "./const"

const MyAnimeListActivity = () => {
  const { myAnimeList } = useMyAnimeList()
  const { selectedViewMode } = useMyAnimeListContext()
  const { filteredMyAnimeList } = useMyAnimeListFilter(myAnimeList)

  const sortByTitle = (animeA: AnimeDTO, animeB: AnimeDTO) => animeA.title.localeCompare(animeB.title)

  return (
    <>
      <MyAnimeListFilterBar />
      {
        {
          [ViewMode.DEFAULT]: (
            <Grid container justifyContent="center" spacing={1}>
              {filteredMyAnimeList.toSorted(sortByTitle).map(anime => (
                <Grid key={anime.malId} lg={3} md={4} xs={12} sm={6}>
                  <MALCard malAnime={anime} />
                </Grid>
              ))}
            </Grid>
          ),
          [ViewMode.ALPHA]: <AlphabetRender items={filteredMyAnimeList} />,
          [ViewMode.SEASON]: <SeasonRender items={filteredMyAnimeList} />
        }[selectedViewMode]
      }
    </>
  )
}

const MyAnimeListActivityWithProvider = () => (
  <MyAnimeListProvider>
    <MyAnimeListActivity />
  </MyAnimeListProvider>
)

export default MyAnimeListActivityWithProvider
