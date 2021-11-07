import React from "react";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { green } from "@mui/material/colors";

function AnimeCompleteButton({ nbEpisodes, isComplete, setIsComplete }) {
  const isDisabled = nbEpisodes === 0;
  if (isDisabled && isComplete) {
    setIsComplete(false);
  }

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
  );
}

export default AnimeCompleteButton;
