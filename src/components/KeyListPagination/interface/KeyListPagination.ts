import { type MouseEvent as ReactMouseEvent } from "react"

export default interface KeyListPagination<Anime> {
  slicedGroupedData: Array<Record<string, Anime[]>>
  onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void
  page: number
  reversed?: boolean
}
