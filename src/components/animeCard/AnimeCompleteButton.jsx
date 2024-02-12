import DoneAllIcon from "@mui/icons-material/DoneAll"
import IconButton from "@mui/material/IconButton"
import green from "@mui/material/colors/green"
import { useEffect } from "react"

const AnimeCompleteButton = ({ nbEpisodes, isComplete, setIsComplete, isCompletePending }) => {
  const isDisabled = nbEpisodes === 0

  useEffect(() => {
    if (isDisabled && isComplete && !isCompletePending) {
      setIsComplete(false)
    }
  }, [isComplete, isCompletePending, isDisabled, setIsComplete])

  return (
    <IconButton
      aria-label="all Anime is complete"
      title="Set as Complete"
      disabled={isDisabled}
      onClick={() => setIsComplete(!isComplete)}
      style={(isComplete && { color: green[500] }) || {}}
      size="large">
      <DoneAllIcon />
    </IconButton>
  )
}

export default AnimeCompleteButton
