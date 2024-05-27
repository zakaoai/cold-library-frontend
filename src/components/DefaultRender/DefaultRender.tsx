import usePagination from "@/hooks/usePagination"
import { Pagination } from "@mui/material"
import { useCallback, type ChangeEvent, type ElementType, type ReactNode } from "react"

interface DefaultRenderProps<Anime> {
  animeList: Anime[]
  component: ElementType
  renderChild: (anime: Anime) => ReactNode
}

const DefaultRender = <T,>({ component: Component, renderChild, animeList }: DefaultRenderProps<T>) => {
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
