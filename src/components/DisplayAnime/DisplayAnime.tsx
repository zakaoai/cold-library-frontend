import AlphabetRender from "@/components/AlphabeticalRender/AlphabetRender"
import DefaultRender from "@/components/DefaultRender/DefaultRender"
import SeasonRender from "@/components/SeasonRender/SeasonRender"

import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import usePagination from "@/hooks/usePagination"
import { useCallback, useEffect, useMemo } from "react"
import type { Anime } from "../AnimeCardRead/interface/Anime"
import DefaultGridComponent from "./DefaultGridComponent"
import { useDisplayAnimeContext } from "./hooks/useDisplayAnimeContext"
import type IDisplayAnime from "./interface/DisplayAnime"

const DisplayAnime = <T extends Anime>({
  animeList,
  TableComponent,
  singleCardRender,
  singleTableRender
}: IDisplayAnime<T>) => {
  const {
    selectedViewMode,
    selectedRenderMode,
    setPagination,
    pagination: contextPagination
  } = useDisplayAnimeContext()

  const cardRenderChild = useCallback((animelist: T[]) => animelist.map(singleCardRender), [singleCardRender])

  const tableRenderChild = useCallback((animelist: T[]) => animelist.map(singleTableRender), [singleTableRender])

  const renderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? DefaultGridComponent : TableComponent),
    [TableComponent, selectedRenderMode]
  )

  const renderChild = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? cardRenderChild : tableRenderChild),
    [cardRenderChild, selectedRenderMode, tableRenderChild]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode, singleCardRender, singleTableRender]
  )

  const pagination = usePagination(animeList, 50)

  useEffect(() => {
    setPagination(pagination)
  }, [pagination, setPagination])

  return {
    [ViewMode.DEFAULT]: (
      <DefaultRender
        component={renderComponent}
        renderChild={singleRender}
        animeList={animeList}
        pagination={contextPagination}
      />
    ),
    [ViewMode.ALPHA]: (
      <AlphabetRender
        component={renderComponent}
        renderChild={renderChild}
        items={animeList}
        pagination={contextPagination}
      />
    ),
    [ViewMode.SEASON]: (
      <SeasonRender
        component={renderComponent}
        renderChild={renderChild}
        items={animeList}
        pagination={contextPagination}
      />
    )
  }[selectedViewMode]
}

export default DisplayAnime
