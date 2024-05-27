import AlphabetRender from "@/components/AlphabeticalRender/AlphabetRender"
// import MALCard from "@/components/MALCard/MALCard"
import SeasonRender from "@/components/SeasonRender/SeasonRender"
import MyAnimeListProvider from "@/context/MyAnimeListProvider"
import useMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeList"
import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
// import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import DefaultRender from "@/components/DefaultRender/DefaultRender"
import { useMemo } from "react"
import GridComponent from "./GridComponent"
import MyAnimeListFilterBar from "./MyAnimeListFilterBar"
import TableComponent from "./TableComponent"

import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import { cardRenderChild, singleCardRender, singleTableRender, tableRenderChild } from "./renderChild"

const MyAnimeListActivity = () => {
  const { myAnimeList } = useMyAnimeList()
  const { selectedViewMode, selectedRenderMode } = useMyAnimeListContext()
  const { filteredMyAnimeList } = useMyAnimeListFilter(myAnimeList)

  const renderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? GridComponent : TableComponent),
    [selectedRenderMode]
  )

  const renderChild = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? cardRenderChild : tableRenderChild),
    [selectedRenderMode]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode]
  )

  return (
    <>
      <MyAnimeListFilterBar />
      {
        {
          [ViewMode.DEFAULT]: (
            <DefaultRender component={renderComponent} renderChild={singleRender} animeList={filteredMyAnimeList} />
          ),
          [ViewMode.ALPHA]: (
            <AlphabetRender component={renderComponent} renderChild={renderChild} items={filteredMyAnimeList} />
          ),
          [ViewMode.SEASON]: (
            <SeasonRender component={renderComponent} renderChild={renderChild} items={filteredMyAnimeList} />
          )
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
