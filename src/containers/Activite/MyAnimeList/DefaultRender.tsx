import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { Pagination } from "@mui/material"
import { useCallback, type ElementType } from "react"
import { type singleCardRender } from "./renderChild"

interface DefaultRenderProps {
  animeList: Array<Omit<MALAnime, "broadcast"> & AnimeDTO>
  component: ElementType
  renderChild: typeof singleCardRender
}

const DefaultRender = ({ component: Component, renderChild, animeList }: DefaultRenderProps) => {
  const { page, setPage } = useMyAnimeListContext()

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    },
    [setPage]
  )

  return (
    <>
      <Pagination
        count={Math.ceil(animeList.length / 50)}
        page={page}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex" }}
        size="medium"
      />
      <Component>{animeList.slice(50 * (page - 1), 50 * page).map(renderChild)}</Component>
      <Pagination
        count={Math.ceil(animeList.length / 50)}
        page={page}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex" }}
        size="medium"
      />
    </>
  )
}
export default DefaultRender
