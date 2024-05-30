interface Pagination {
  last_visible_page: number
  current_page: number
  has_next_page: boolean
}

export default interface DataListHolderWithPagination<T> {
  data: T[]
  pagination: Pagination
}
