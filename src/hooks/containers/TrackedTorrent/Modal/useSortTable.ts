import { useEffect, useState } from "react";

const useSortTable = () => {
  const [orderBy, setOrderBy] = useState(undefined);
  const [order, setOrder] = useState("asc");

  const [sortFunction, setSortFunction] = useState(() => items => items);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  useEffect(() => {
    if (orderBy && order) {
      const tempSortFunction = () => items => items.sort(getComparator(order, orderBy));
      setSortFunction(tempSortFunction);
    } else setSortFunction(() => items => items);
  }, [order, orderBy]);

  const sortBy = property => {
    if (orderBy === property) {
      setOrder(order => (order === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(property);
      setOrder("asc");
    }
  };

  return { orderBy, order, sortBy, sortFunction };
};

export default useSortTable;
