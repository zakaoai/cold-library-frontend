import { useState, type ChangeEventHandler, type MouseEvent as ReactMouseEvent } from "react"

const usePagination = <T>(animeEpisodes: T[], defaultRowPerPage: number = 5) => {
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowPerPage)
  const [page, setPage] = useState(0)

  const labelTemplate = ({ page }: { page: number }) =>
    `page ${page + 1}/${Math.ceil(animeEpisodes.length / rowsPerPage)}`

  const handleChangePage = (_event: ReactMouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return {
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    labelTemplate,
    sliceBegin: rowsPerPage * page,
    sliceEnd: rowsPerPage * (page + 1)
  }
}

export default usePagination
