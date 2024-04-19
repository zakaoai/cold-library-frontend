import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useCallback, useMemo } from "react"
import KeyListPagination from "../KeyListPagination/KeyListPagination"
import SeasonMenu from "./SeasonMenu"
import YearSection from "./YearSection"
import type ISeasonRender from "./interface/SeasonRender"

const SeasonRender = ({ items, renderChild, component }: ISeasonRender) => {
  const { page, setPage } = useMyAnimeListContext()

  const handleChange = useCallback(
    (_: unknown, value: number) => {
      setPage(value)
    },
    [setPage]
  )

  const groupedData = useMemo(
    () =>
      items.reduce<Record<number | string, typeof items>>((acc, item) => {
        if (acc[item.year ?? "TBA"] === undefined) {
          acc[item.year ?? "TBA"] = []
        }
        acc[item.year ?? "TBA"].push(item)
        return acc
      }, {}),
    [items]
  )

  const slicedGroupedData = useMemo(
    () =>
      Object.entries(groupedData)
        .toSorted(([keyA], [keyB]) => keyB.localeCompare(keyA))
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
        <KeyListPagination onClick={handleChange} page={page} slicedGroupedData={slicedGroupedData} reversed />
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Grid flex={1}>
          {Object.entries(slicedGroupedData[page - 1])
            .toSorted(([akey], [bkey]) => bkey.localeCompare(akey))
            .map(([key, value]) => (
              <YearSection key={key} year={key} items={value} component={component} renderChild={renderChild} />
            ))}
        </Grid>
        <SeasonMenu alphabet={Object.keys(slicedGroupedData[page - 1])} />
      </Grid>
    </>
  )
}

export default SeasonRender
