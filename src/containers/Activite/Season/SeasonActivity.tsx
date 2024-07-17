import DefaultRender from "@/components/DefaultRender/DefaultRender"
import { useCallback, useEffect, useMemo } from "react"
import SeasonFilterBar from "./SeasonFilterBar"

import DefaultAnimeRenderCard from "@/components/DefaultAnimeRender/DefaultAnimeRenderCard"
import DefaultAnimeRenderRow from "@/components/DefaultAnimeRender/DefaultAnimeRenderRow"
import DefaultGridComponent from "@/components/DisplayAnime/DefaultGridComponent"
import DefaultTableComponent from "@/components/DisplayAnime/DefaultTableComponent"
import DisplayAnimeProvider from "@/components/DisplayAnime/context/DisplayAnimeProvider"
import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import SeasonProvider from "@/context/SeasonProvider"
import { RenderMode } from "@/enums/RenderMode"
import useSeason from "@/hooks/containers/Activite/Season/useSeason"
import { useSeasonContext } from "@/hooks/context/useSeasonContext"
import usePagination from "@/hooks/usePagination"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"

const SeasonActivity = () => {
  const { seasonAnime, genres } = useSeason()
  const { selectedRenderMode, selectedGenres, setPagination } = useDisplayAnimeContext()
  const { setAnimeList } = useSeasonContext()

  const pagination = usePagination(seasonAnime, 50)

  useEffect(() => {
    setPagination(pagination)
  }, [pagination, setPagination])

  const renderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? DefaultGridComponent : DefaultTableComponent(true)),
    [selectedRenderMode]
  )
  const singleCardRender = useCallback(
    (anime: AnimeDTO) => (
      <DefaultAnimeRenderCard
        key={anime.malId}
        setAnimeListState={setAnimeList}
        anime={anime}
        selectedGenres={selectedGenres}
      />
    ),
    [selectedGenres, setAnimeList]
  )

  const singleTableRender = useCallback(
    (anime: AnimeDTO) => (
      <DefaultAnimeRenderRow
        key={anime.malId}
        anime={anime}
        setAnimeListState={setAnimeList}
        selectedGenres={selectedGenres}
      />
    ),
    [selectedGenres, setAnimeList]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode, singleCardRender, singleTableRender]
  )

  return (
    <>
      <SeasonFilterBar genres={genres} />
      <DefaultRender
        component={renderComponent}
        renderChild={singleRender}
        animeList={seasonAnime}
        pagination={pagination}
      />
    </>
  )
}

const SeasonActivityWithProvider = () => (
  <SeasonProvider>
    <DisplayAnimeProvider>
      <SeasonActivity />
    </DisplayAnimeProvider>
  </SeasonProvider>
)

export default SeasonActivityWithProvider
