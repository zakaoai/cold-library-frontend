import Season from "@/enums/Season"
import { Typography } from "@mui/material"
import { useMemo } from "react"
import SeasonSection from "./SeasonSection"
import type IYearSection from "./interface/YearSection"

const YearSection = ({ year, items }: IYearSection) => {
  const seasonItems = useMemo(
    () =>
      items.reduce<Record<string, typeof items>>((acc, item) => {
        if (acc[item.season ?? Season.UNKNOWN] === undefined) {
          acc[item.season ?? Season.UNKNOWN] = []
        }
        acc[item.season ?? Season.UNKNOWN].push(item)
        return acc
      }, {}),
    [items]
  )

  const entriesItems = Object.entries(seasonItems)

  const seasonSorted = ([a]: (typeof entriesItems)[0], [b]: (typeof entriesItems)[0]) => {
    const order: { [key in Season]: number } = {
      [Season.WINTER]: 0,
      [Season.SPRING]: 1,
      [Season.SUMMER]: 2,
      [Season.FALL]: 3,
      [Season.LATER]: 4,
      [Season.UNKNOWN]: 5
    }

    return order[Season[a.toUpperCase() as keyof typeof Season]] - order[Season[b.toUpperCase() as keyof typeof Season]]
  }

  return (
    <>
      <Typography id={year.toUpperCase()} variant="h5" component="h2" gutterBottom>
        {year}
      </Typography>

      {Object.entries(seasonItems)
        .toSorted(seasonSorted)
        .map(([key, value]) => (
          <SeasonSection key={key} season={key} items={value} />
        ))}
    </>
  )
}

export default YearSection
