import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import { useMemo } from "react"
import AlphabetMenu from "./AlphabetMenu"
import AlphabetSection from "./AlphabetSection"
import type IAlphabetRender from "./interface/AlphabetRender"

const AlphabetRender = ({ items, component, renderChild }: IAlphabetRender) => {
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

  return (
    <Grid sx={{ display: "flex" }}>
      <Grid flex={1}>
        {Object.entries(groupedData)
          .toSorted(([akey], [bkey]) => akey.localeCompare(bkey))
          .map(([key, value]) => (
            <AlphabetSection key={key} letter={key} items={value} component={component} renderChild={renderChild} />
          ))}
      </Grid>
      <AlphabetMenu alphabet={Object.keys(groupedData)} />
    </Grid>
  )
}

export default AlphabetRender
