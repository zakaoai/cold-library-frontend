import AlphabetRender from "@/components/AlphabeticalRender/AlphabetRender"
import DefaultRender from "@/components/DefaultRender/DefaultRender"
import SeasonRender from "@/components/SeasonRender/SeasonRender"
import AnimeCardComponent from "@/components/animeCard/AnimeCardComponent"
import AnimeCardProvider from "@/components/animeCard/context/AnimeCardProvider"
import AnimeLibraryProvider from "@/context/AnimeLibraryProvider"
import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import { useAnimeLibrarContext } from "@/hooks/context/useAnimeLibraryContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useCallback, useMemo } from "react"

import AnimeRow from "@/components/animeCard/AnimeRow"
import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"

import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar"
import GridComponent from "./GridComponent"
import TableComponent from "./TableComponent"

/**
 * Activité
 */
const AnimeLibraryActivity = () => {
  const { animes, updateAnime } = useLibrary()

  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  const animesFiltered = useMemo(() => animes.filter(filterFunc), [animes, filterFunc])

  const singleCardRender = useCallback(
    (anime: AnimeDTO) => (
      <Grid key={anime.malId} lg={3} md={4} xs={12} sm={6}>
        <AnimeCardProvider anime={anime} showEpisodeLink updateAnime={updateAnime} showAddOrRemoveFromLibrary>
          <AnimeCardComponent />
        </AnimeCardProvider>
      </Grid>
    ),
    [updateAnime]
  )
  const { selectedViewMode, selectedRenderMode } = useAnimeLibrarContext()

  const cardRenderChild = useCallback((animelist: AnimeDTO[]) => animelist.map(singleCardRender), [singleCardRender])

  const singleTableRender = useCallback(
    (anime: AnimeDTO) => (
      <AnimeCardProvider
        key={anime.malId}
        anime={anime}
        showEpisodeLink
        updateAnime={updateAnime}
        showAddOrRemoveFromLibrary>
        <AnimeRow />
      </AnimeCardProvider>
    ),
    [updateAnime]
  )

  const tableRenderChild = useCallback((animelist: AnimeDTO[]) => animelist.map(singleTableRender), [singleTableRender])

  const renderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? GridComponent : TableComponent),
    [selectedRenderMode]
  )

  const renderChild = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? cardRenderChild : tableRenderChild),
    [cardRenderChild, selectedRenderMode, tableRenderChild]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode, singleCardRender, singleTableRender]
  )

  return (
    <>
      <AnimeLibraryFilterBar filtersState={filtersState} />
      {
        {
          [ViewMode.DEFAULT]: (
            <DefaultRender
              component={renderComponent}
              renderChild={singleRender}
              animeList={animesFiltered.toReversed()}
            />
          ),
          [ViewMode.ALPHA]: (
            <AlphabetRender component={renderComponent} renderChild={renderChild} items={animesFiltered} />
          ),
          [ViewMode.SEASON]: (
            <SeasonRender component={renderComponent} renderChild={renderChild} items={animesFiltered} />
          )
        }[selectedViewMode]
      }
    </>
  )
}

const AnimeLibraryWithProvider = () => (
  <AnimeLibraryProvider>
    <AnimeLibraryActivity />
  </AnimeLibraryProvider>
)

export default AnimeLibraryWithProvider
