import SearchForm from "@/containers/Activite/Search/SearchForm"
import useAnimeSearch from "@/hooks/containers/Search/useAnimeSearch"
import { CircularProgress, Pagination } from "@mui/material"

import DefaultAnimeRenderCard from "@/components/DefaultAnimeRender/DefaultAnimeRenderCard"
import DefaultAnimeRenderRow from "@/components/DefaultAnimeRender/DefaultAnimeRenderRow"
import DefaultGridComponent from "@/components/DisplayAnime/DefaultGridComponent"
import DefaultTableComponent from "@/components/DisplayAnime/DefaultTableComponent"
import DisplayAnimeProvider from "@/components/DisplayAnime/context/DisplayAnimeProvider"
import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import { RenderMode } from "@/enums/RenderMode"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { useCallback, useMemo } from "react"
/**
 * Activité
 */
const SearchActivity = () => {
  const { animes, isFetching, error, form, searchAnime, setAnimes, pageMax, currentPage, handleChange } =
    useAnimeSearch()

  const paginationRender = useMemo(
    () => (
      <Pagination
        count={pageMax}
        page={currentPage}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex", paddingY: 2 }}
      />
    ),
    [currentPage, handleChange, pageMax]
  )

  const singleCardRender = useCallback(
    (anime: AnimeDTO) => <DefaultAnimeRenderCard key={anime.malId} anime={anime} setAnimeListState={setAnimes} />,
    [setAnimes]
  )

  const singleTableRender = useCallback(
    (anime: AnimeDTO) => <DefaultAnimeRenderRow key={anime.malId} anime={anime} setAnimeListState={setAnimes} />,
    [setAnimes]
  )

  const { selectedRenderMode } = useDisplayAnimeContext()

  const RenderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? DefaultGridComponent : DefaultTableRenderComponent),
    [selectedRenderMode]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode, singleCardRender, singleTableRender]
  )

  return (
    <>
      <SearchForm searchAnime={searchAnime} form={form} />
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {pageMax !== undefined ? paginationRender : undefined}
          <RenderComponent>{animes.map(singleRender)}</RenderComponent>
          {pageMax !== undefined ? paginationRender : undefined}
        </>
      )}
      {!isFetching && error !== undefined && <div>{error}</div>}
    </>
  )
}

const DefaultTableRenderComponent = DefaultTableComponent()

const SearchActivityWithContext = () => (
  <DisplayAnimeProvider>
    <SearchActivity />
  </DisplayAnimeProvider>
)

export default SearchActivityWithContext
