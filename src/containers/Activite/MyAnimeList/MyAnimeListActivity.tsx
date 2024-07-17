import MyAnimeListProvider from "@/context/MyAnimeListProvider"
import useMyAnimeList from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeList"
import useMyAnimeListFilter from "@/hooks/containers/Activite/MyAnimeList/useMyAnimeListFilter"

import MyAnimeListFilterBar from "./MyAnimeListFilterBar"

import DefaultAnimeRenderCard from "@/components/DefaultAnimeRender/DefaultAnimeRenderCard"
import DefaultAnimeRenderRow from "@/components/DefaultAnimeRender/DefaultAnimeRenderRow"
import DefaultTableComponent from "@/components/DisplayAnime/DefaultTableComponent"
import DisplayAnime from "@/components/DisplayAnime/DisplayAnime"
import DisplayAnimeProvider from "@/components/DisplayAnime/context/DisplayAnimeProvider"
import { useDisplayAnimeContext } from "@/components/DisplayAnime/hooks/useDisplayAnimeContext"
import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import type MALAnimeAnimeDTO from "@/interfaces/containers/Activite/MyAnimeList/MALAnimeAnimeDTO"
import { TableCell } from "@mui/material"
import { useCallback } from "react"
import { backgroundByStatus } from "./const"

const MyAnimeListActivity = () => {
  const { myAnimeList } = useMyAnimeList()
  const { selectedGenres } = useDisplayAnimeContext()
  const { filteredMyAnimeList } = useMyAnimeListFilter(myAnimeList)
  const { setMyAnimeList } = useMyAnimeListContext()

  const animeCardRead = useCallback(
    (anime: MALAnimeAnimeDTO) => ({
      avatarColor: backgroundByStatus[anime.userStatus ?? "unknown"],
      showEpisodeLink: anime.addedOnServer !== undefined,
      imageHeight: "100%"
    }),
    []
  )

  const singleCardRender = useCallback(
    (anime: MALAnimeAnimeDTO) => (
      <DefaultAnimeRenderCard
        key={anime.malId}
        setAnimeListState={setMyAnimeList}
        anime={anime}
        selectedGenres={selectedGenres}
        animeCardRead={animeCardRead(anime)}
      />
    ),
    [animeCardRead, selectedGenres, setMyAnimeList]
  )

  const animeRowRead = useCallback(
    (anime: MALAnimeAnimeDTO) => ({
      beforeTableCell: (
        <TableCell sx={{ background: backgroundByStatus[anime.userStatus], paddingX: "5px" }} padding="none" />
      )
    }),
    []
  )

  const singleTableRender = useCallback(
    (anime: MALAnimeAnimeDTO) => (
      <DefaultAnimeRenderRow
        key={anime.malId}
        anime={anime}
        setAnimeListState={setMyAnimeList}
        selectedGenres={selectedGenres}
        animeRowRead={animeRowRead(anime)}
      />
    ),
    [animeRowRead, selectedGenres, setMyAnimeList]
  )

  return (
    <>
      <MyAnimeListFilterBar />
      <DisplayAnime
        animeList={filteredMyAnimeList}
        TableComponent={DefaultTableComponent(true, true)}
        singleCardRender={singleCardRender}
        singleTableRender={singleTableRender}
      />
    </>
  )
}

const MyAnimeListActivityWithProvider = () => (
  <DisplayAnimeProvider>
    <MyAnimeListProvider>
      <MyAnimeListActivity />
    </MyAnimeListProvider>
  </DisplayAnimeProvider>
)

export default MyAnimeListActivityWithProvider
