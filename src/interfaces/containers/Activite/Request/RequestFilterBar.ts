import type { RequestFilters } from "./RequestFilters"

export default interface RequestFilterBar {
  onFilterChange: (filters: RequestFilters) => void
}
