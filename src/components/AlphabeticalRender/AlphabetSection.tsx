import { Typography } from "@mui/material"
import type IAlphabetSection from "./interface/AlphabetSection"

const AlphabetSection = ({ letter, items, component: Component, renderChild }: IAlphabetSection) => {
  return (
    <>
      <Typography id={letter.toUpperCase()} variant="h5" component="h2" gutterBottom>
        {letter}
      </Typography>
      <Component>{renderChild(items)}</Component>
    </>
  )
}

export default AlphabetSection
