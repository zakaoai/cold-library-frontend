import { useState } from "react"

const usePagination = (animeEpisodes: unknown[]) => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const labelTemplate = ({ page }: { page: number }) =>
    `page ${page + 1}/${Math.ceil(animeEpisodes.length / rowsPerPage)}`

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => {
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
