import { Typography } from "@mui/material"
import type ISeasonSection from "./interface/SeasonSection"

const SeasonSection = ({ season, items, renderChild, component: Component }: ISeasonSection) => {
  return (
    <>
      {season !== "null" && (
        <Typography id={season.toUpperCase()} variant="h5" component="h2" gutterBottom>
          {season}
        </Typography>
      )}
      <Component>{renderChild(items)}</Component>
    </>
  )
}

export default SeasonSection
