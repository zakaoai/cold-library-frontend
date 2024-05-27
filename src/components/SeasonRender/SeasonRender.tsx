import Season from "@/enums/Season"
import usePagination from "@/hooks/usePagination"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useMemo } from "react"
import KeyListPagination from "../KeyListPagination/KeyListPagination"
import SeasonMenu from "./SeasonMenu"
import YearSection from "./YearSection"
import type ISeasonRender from "./interface/SeasonRender"

const SeasonRender = <T extends { year?: number; season?: Season }>({
  items,
  renderChild,
  component
}: ISeasonRender<T>) => {
  const { page, handleChangePage, rowsPerPage } = usePagination<T>(items, 50)

  const groupedData = useMemo(
    () =>
      items.reduce<Record<number | string, T[]>>((acc, item) => {
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
        .reduce<Array<Record<string, T[]>>>(
          (acc, item) => {
            const lastAccLength = Object.values(acc[acc.length - 1]).reduce((count, list) => (count += list.length), 0)
            if (lastAccLength >= rowsPerPage) {
              acc.push({ [item[0]]: item[1] })
            } else {
              acc[acc.length - 1][item[0]] = item[1]
            }

            return acc
          },
          [{}]
        ),
    [groupedData, rowsPerPage]
  )

  return (
    <>
      <Grid sx={{ maxWidth: "fit-content", margin: "auto" }}>
        <KeyListPagination onClick={handleChangePage} page={page} slicedGroupedData={slicedGroupedData} reversed />
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Grid flex={1}>
          {Object.entries(slicedGroupedData[page])
            .toSorted(([akey], [bkey]) => bkey.localeCompare(akey))
            .map(([key, value]) => (
              <YearSection key={key} year={key} items={value} component={component} renderChild={renderChild} />
            ))}
        </Grid>
        <SeasonMenu alphabet={Object.keys(slicedGroupedData[page])} />
      </Grid>
    </>
  )
}

export default SeasonRender
