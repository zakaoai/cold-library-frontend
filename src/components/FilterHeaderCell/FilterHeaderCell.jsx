import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

const FilterHeaderCell = ({ id, filter, label, orderBy, order, sortBy }) => {
  return (
    <TableCell key={id} sortDirection={orderBy === id ? order : false}>
      {filter ? (
        <TableSortLabel active={orderBy === id} direction={orderBy === id ? order : "asc"} onClick={() => sortBy(id)}>
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
};

export default FilterHeaderCell;
