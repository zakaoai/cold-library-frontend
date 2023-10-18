import DoneAllIcon from "@mui/icons-material/DoneAll";
import IconButton from "@mui/material/IconButton";
import green from "@mui/material/colors/green";

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
