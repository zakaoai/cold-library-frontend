import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const LastAvaibleEpisode = () => {
  const {
    anime: { lastAvaibleEpisode },
    updateAnimeState: { setLastAvaibleEpisode }
  } = useAnimeCardContext()
  const [isEditMode, setisEditMode] = useState(false)
  const [numberFieldValue, setNumberFieldValue] = useState(lastAvaibleEpisode || 0)

  return (
    (isEditMode && (
      <TextField
        id="standard-number"
        label="Number"
        size="small"
        fullWidth={true}
        value={numberFieldValue}
        autoFocus
        type="number"
        onChange={e => {
          setNumberFieldValue(parseInt(e.target.value))
        }}
        onBlur={() => {
          setLastAvaibleEpisode(numberFieldValue)
          setisEditMode(false)
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
    )) || (
      <Button
        onClick={() => {
          setisEditMode(true)
        }}>
        {lastAvaibleEpisode}
      </Button>
    )
  )
}

export default LastAvaibleEpisode
