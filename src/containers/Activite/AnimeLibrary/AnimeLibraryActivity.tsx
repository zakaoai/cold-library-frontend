import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"
import useLibrary from "@/hooks/containers/AnimeLibrary/useLibrary"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import Grid from "@mui/material/Grid" // Grid version 2
import { useCallback, useMemo } from "react"

import AnimeCardReadComponent from "@/components/AnimeCardRead/AnimeCardReadComponent"
import AnimeRowRead from "@/components/AnimeRowRead/AnimeRowRead"
import DefaultTableComponent from "@/components/DisplayAnime/DefaultTableComponent"
import DisplayAnime from "@/components/DisplayAnime/DisplayAnime"
import DisplayAnimeProvider from "@/components/DisplayAnime/context/DisplayAnimeProvider"
import AnimeBottomAction from "./AnimeBottomAction"
import AnimeLibraryFilterBar from "./AnimeLibraryFilterBar"

/**
 * Activité
 */
const AnimeLibraryActivity = () => {
  const { animes } = useLibrary()

  const { filtersState, filterFunc } = useAnimeLibraryFilter()

  const animesFiltered = useMemo(() => animes.filter(filterFunc), [animes, filterFunc])

  const singleCardRender = useCallback(
    (anime: AnimeDTO) => (
      <Grid key={anime.malId} size={{ lg: 3, md: 4, xs: 12, sm: 6 }}>
        <AnimeCardReadComponent anime={anime} showEpisodeLink actions={<AnimeBottomAction anime={anime} />} />
      </Grid>
    ),
    []
  )

  const singleTableRender = useCallback(
    (anime: AnimeDTO) => (
      <AnimeRowRead
        key={anime.malId}
        imageHeight="120px"
        anime={anime}
        actionTableCell={<AnimeBottomAction anime={anime} renderRow />}
      />
    ),
    []
  )

  return (
    <>
      <AnimeLibraryFilterBar filtersState={filtersState} />
      <DisplayAnime
        animeList={animesFiltered}
        TableComponent={DefaultTableComponent()}
        singleCardRender={singleCardRender}
        singleTableRender={singleTableRender}
      />
    </>
  )
}

const AnimeLibraryWithProvider = () => (
  <DisplayAnimeProvider>
    <AnimeLibraryActivity />
  </DisplayAnimeProvider>
)

export default AnimeLibraryWithProvider
