import { useCallback, useMemo, useState, type ChangeEventHandler, type MouseEvent as ReactMouseEvent } from "react"

const usePagination = <T>(animeEpisodes: T[], defaultRowPerPage = 5) => {
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowPerPage)
  const [page, setPage] = useState(0)

  const labelTemplate = useCallback(
    ({ page }: { page: number }) => `page ${page + 1}/${Math.ceil(animeEpisodes.length / rowsPerPage)}`,
    [animeEpisodes.length, rowsPerPage]
  )

  const handleChangePage = useCallback(
    (_event: ReactMouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage)
    },
    [setPage]
  )

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback(
    event => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [setRowsPerPage, setPage]
  )

  const resetPagination = useCallback(() => {
    setRowsPerPage(defaultRowPerPage)
    setPage(0)
  }, [defaultRowPerPage])

  return useMemo(
    () => ({
      rowsPerPage,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
      labelTemplate,
      sliceBegin: rowsPerPage * page,
      sliceEnd: rowsPerPage * (page + 1),
      resetPagination
    }),
    [handleChangePage, handleChangeRowsPerPage, labelTemplate, page, rowsPerPage, resetPagination]
  )
}

export default usePagination
