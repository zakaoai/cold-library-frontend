import usePagination from "@/hooks/usePagination"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { Pagination } from "@mui/material"
import { useCallback, type ChangeEvent, type ElementType } from "react"
import { type singleCardRender } from "./renderChild"

interface DefaultRenderProps {
  animeList: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>
  component: ElementType
  renderChild: typeof singleCardRender
}

const DefaultRender = ({ component: Component, renderChild, animeList }: DefaultRenderProps) => {
  const { page, handleChangePage, sliceBegin, sliceEnd, rowsPerPage } = usePagination(animeList, 50)

  const handleChange = useCallback(
    (_: ChangeEvent<unknown>, value: number) => {
      handleChangePage(null, value - 1)
    },
    [handleChangePage]
  )

  return (
    <>
      <Pagination
        count={Math.ceil(animeList.length / rowsPerPage)}
        page={page + 1}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex" }}
        size="medium"
      />
      <Component>{animeList.slice(sliceBegin, sliceEnd).map(renderChild)}</Component>
      <Pagination
        count={Math.ceil(animeList.length / rowsPerPage)}
        page={page + 1}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex" }}
        size="medium"
      />
    </>
  )
}
export default DefaultRender
