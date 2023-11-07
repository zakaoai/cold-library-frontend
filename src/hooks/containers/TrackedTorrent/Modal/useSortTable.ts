import { useEffect, useState } from "react";

type order = "desc" | "asc";

const useSortTable = <Type extends object>() => {
  const [orderBy, setOrderBy] = useState<undefined | keyof Type>(undefined);
  const [order, setOrder] = useState<order>("asc");

  const [sortFunction, setSortFunction] = useState(() => (items: Type[]) => items);

  function descendingComparator(a: Type, b: Type, orderBy: keyof Type) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: order, orderBy: keyof Type) {
    return order === "desc"
      ? (a: Type, b: Type) => descendingComparator(a, b, orderBy)
      : (a: Type, b: Type) => -descendingComparator(a, b, orderBy);
  }

  useEffect(() => {
    if (orderBy && order) {
      const tempSortFunction = () => (items: Type[]) => items.sort(getComparator(order, orderBy));
      setSortFunction(tempSortFunction);
    } else setSortFunction(() => (items: Type[]) => items);
  }, [order, orderBy]);

  const sortBy = (property: keyof Type) => {
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
