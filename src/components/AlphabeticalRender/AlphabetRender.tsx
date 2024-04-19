import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useCallback, useMemo } from "react"
import KeyListPagination from "../KeyListPagination/KeyListPagination"
import AlphabetMenu from "./AlphabetMenu"
import AlphabetSection from "./AlphabetSection"
import type IAlphabetRender from "./interface/AlphabetRender"

const AlphabetRender = ({ items, component, renderChild }: IAlphabetRender) => {
  const { page, setPage } = useMyAnimeListContext()

  const handleChange = useCallback(
    (_: unknown, value: number) => {
      setPage(value)
    },
    [setPage]
  )

  const groupedData = useMemo(
    () =>
      items.reduce<Record<string, typeof items>>((acc, item) => {
        const firstLetter = item.title[0].toUpperCase()
        if (acc[firstLetter] === undefined) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(item)
        return acc
      }, {}),

    [items]
  )

  const slicedGroupedData = useMemo(
    () =>
      Object.entries(groupedData)
        .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .reduce<Array<Record<string, typeof items>>>(
          (acc, item) => {
            const lastAccLength = Object.values(acc[acc.length - 1]).reduce((count, list) => (count += list.length), 0)
            if (lastAccLength >= 50) {
              acc.push({ [item[0]]: item[1] })
            } else {
              acc[acc.length - 1][item[0]] = item[1]
            }

            return acc
          },
          [{}]
        ),
    [groupedData]
  )

  return (
    <>
      <Grid sx={{ maxWidth: "fit-content", margin: "auto" }}>
        <KeyListPagination onClick={handleChange} page={page} slicedGroupedData={slicedGroupedData} />
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Grid flex={1}>
          {Object.entries(slicedGroupedData[page - 1])
            .toSorted(([akey], [bkey]) => akey.localeCompare(bkey))
            .map(([key, value]) => (
              <AlphabetSection key={key} letter={key} items={value} component={component} renderChild={renderChild} />
            ))}
        </Grid>
        <AlphabetMenu alphabet={Object.keys(slicedGroupedData[page - 1])} />
      </Grid>
    </>
  )
}

export default AlphabetRender
