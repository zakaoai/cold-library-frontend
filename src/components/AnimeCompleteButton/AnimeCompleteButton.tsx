import DoneAllIcon from "@mui/icons-material/DoneAll"
import IconButton from "@mui/material/IconButton"
import { green } from "@mui/material/colors"
import { useEffect } from "react"
import type IAnimeCompleteButton from "./interface/AnimeCompleteButton"

const AnimeCompleteButton = ({ nbEpisodes, isComplete, setIsComplete, isCompletePending }: IAnimeCompleteButton) => {
  const isDisabled = nbEpisodes === 0 || nbEpisodes === undefined

  useEffect(() => {
    if (isDisabled && isComplete === true && isCompletePending === false) {
      setIsComplete(false)
    }
  }, [isComplete, isCompletePending, isDisabled, setIsComplete])

  return (
    <IconButton
      aria-label="all Anime is complete"
      title="Set as Complete"
      disabled={isDisabled}
      onClick={() => {
        setIsComplete(!(isComplete ?? true))
      }}
      style={isComplete === true ? { color: green[500] } : {}}
      size="large">
      <DoneAllIcon />
    </IconButton>
  )
}

export default AnimeCompleteButton
