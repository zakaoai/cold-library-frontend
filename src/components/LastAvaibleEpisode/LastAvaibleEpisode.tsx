import type useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState } from "react"

const LastAvaibleEpisode = ({
  updateAnimeState,
  anime
}: {
  updateAnimeState: ReturnType<typeof useUpdateAnimeState>
  anime: AnimeDTO
}) => {
  const { lastAvaibleEpisode } = anime
  const { setLastAvaibleEpisode } = updateAnimeState
  const [isEditMode, setIsEditMode] = useState(false)
  const [numberFieldValue, setNumberFieldValue] = useState(lastAvaibleEpisode ?? 0)

  return isEditMode ? (
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
        setIsEditMode(false)
      }}
      InputLabelProps={{
        shrink: true
      }}
    />
  ) : (
    <Button
      onClick={() => {
        setIsEditMode(true)
      }}>
      {lastAvaibleEpisode}
    </Button>
  )
}

export default LastAvaibleEpisode
