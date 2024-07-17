import type usePagination from "@/hooks/usePagination"
import { Pagination } from "@mui/material"
import { useCallback, useMemo, type ChangeEvent, type ElementType, type ReactNode } from "react"

interface DefaultRenderProps<Anime> {
  animeList: Anime[]
  component: ElementType
  renderChild: (anime: Anime) => ReactNode
  pagination: ReturnType<typeof usePagination>
}

const DefaultRender = <T,>({ component: Component, renderChild, animeList, pagination }: DefaultRenderProps<T>) => {
  const { page, handleChangePage, sliceBegin, sliceEnd, rowsPerPage } = pagination

  const handleChange = useCallback(
    (_: ChangeEvent<unknown>, value: number) => {
      window.scrollTo(0, 0)
      handleChangePage(null, value - 1)
    },
    [handleChangePage]
  )

  const paginationRender = useMemo(
    () => (
      <Pagination
        count={Math.ceil(animeList.length / rowsPerPage)}
        page={page + 1}
        onChange={handleChange}
        sx={{ justifyContent: "center", display: "flex" }}
        size="medium"
      />
    ),
    [animeList.length, handleChange, page, rowsPerPage]
  )

  return (
    <>
      {paginationRender}
      <Component>{animeList.slice(sliceBegin, sliceEnd).map(renderChild)}</Component>
      {paginationRender}
    </>
  )
}

export default DefaultRender
