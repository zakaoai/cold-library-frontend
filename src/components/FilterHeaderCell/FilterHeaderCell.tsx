import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import IFilterHeaderCell from "./interface/FilterHeaderCell"

const FilterHeaderCell = <Type extends object>({
  id,
  filter,
  label,
  orderBy,
  order,
  sortBy
}: IFilterHeaderCell<Type>) => {
  return (
    <TableCell key={id} sortDirection={orderBy === id ? order : false}>
      {filter ? (
        <TableSortLabel
          active={orderBy === id}
          direction={orderBy === id ? order : "asc"}
          onClick={() => sortBy(id as Extract<keyof Type, string>)}>
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  )
}

export default FilterHeaderCell
