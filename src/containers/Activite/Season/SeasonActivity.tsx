// import MALCard from "@/components/MALCard/MALCard"
import MyAnimeListProvider from "@/context/MyAnimeListProvider"
import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
// import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import DefaultRender from "@/components/DefaultRender/DefaultRender"
import { useMemo } from "react"
import GridComponent from "./GridComponent"
import SeasonFilterBar from "./SeasonFilterBar"
import TableComponent from "./TableComponent"

import SeasonProvider from "@/context/SeasonProvider"
import { RenderMode } from "@/enums/RenderMode"
import useSeason from "@/hooks/containers/Activite/Season/useSeason"
import { singleCardRender, singleTableRender } from "./renderChild"

const SeasonActivity = () => {
  const { seasonAnime } = useSeason()
  const { selectedRenderMode, pagination } = useMyAnimeListContext()
  const { filteredMyAnimeList: filteredSeasonAnimeList } = useMyAnimeListFilter(seasonAnime)

  const renderComponent = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? GridComponent : TableComponent),
    [selectedRenderMode]
  )

  const singleRender = useMemo(
    () => (selectedRenderMode === RenderMode.CARD ? singleCardRender : singleTableRender),
    [selectedRenderMode]
  )

  return (
    <>
      <SeasonFilterBar />
      <DefaultRender
        component={renderComponent}
        renderChild={singleRender}
        animeList={filteredSeasonAnimeList}
        pagination={pagination}
      />
    </>
  )
}

const SeasonActivityWithProvider = () => (
  <SeasonProvider>
    <MyAnimeListProvider>
      <SeasonActivity />
    </MyAnimeListProvider>
  </SeasonProvider>
)

export default SeasonActivityWithProvider
