import { Button } from "@mui/material"
import type IKeyListPagination from "./interface/KeyListPagination"

const KeyListPagination = <T extends object>({ slicedGroupedData, onClick, page, reversed }: IKeyListPagination<T>) =>
  slicedGroupedData
    .reduce<string[]>((acc, keys: object) => {
      const letterKeys = Object.keys(keys).toSorted((a, b) =>
        reversed === true ? b.localeCompare(a) : a.localeCompare(b)
      )
      acc.push(letterKeys.length > 1 ? `${letterKeys[0]}-${letterKeys[letterKeys.length - 1]}` : letterKeys[0])
      return acc
    }, [])
    .map((value, index) => (
      <Button
        key={value}
        variant="text"
        onClick={e => {
          window.scrollTo(0, 0)
          onClick(e, index)
        }}
        disabled={index === page}>
        {value}
      </Button>
    ))

export default KeyListPagination
