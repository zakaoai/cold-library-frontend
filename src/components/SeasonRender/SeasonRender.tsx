import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useMemo } from "react"
import SeasonMenu from "./SeasonMenu"
import YearSection from "./YearSection"
import type ISeasonRender from "./interface/SeasonRender"

const SeasonRender = ({ items }: ISeasonRender) => {
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

  return (
    <Grid sx={{ display: "flex" }}>
      <Grid flex={1}>
        {Object.entries(groupedData)
          .toSorted(([akey], [bkey]) => bkey.localeCompare(akey))
          .map(([key, value]) => (
            <YearSection key={key} year={key} items={value} />
          ))}
      </Grid>
      <SeasonMenu alphabet={Object.keys(groupedData)} />
    </Grid>
  )
}

export default SeasonRender
