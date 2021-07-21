import React from "react";
import { IconButton } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { green } from "@material-ui/core/colors";

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
      style={(isComplete && { color: green[500] }) || {}}>
      <DoneAllIcon />
    </IconButton>
  );
}

export default AnimeCompleteButton;
