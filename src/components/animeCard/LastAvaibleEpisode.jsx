import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

export default function LastAvaibleEpisode({ lastAvaibleEpisode, setLastAvaibleEpisode }) {
  const [isEditMode, setisEditMode] = useState(false);
  const [numberFieldValue, setNumberFieldValue] = useState(lastAvaibleEpisode);

  return (
    (isEditMode && (
      <TextField
        id="standard-number"
        label="Number"
        size="small"
        fullWidth
        value={numberFieldValue}
        autoFocus
        type="number"
        onChange={e => setNumberFieldValue(e.target.value)}
        onBlur={() => {
          setLastAvaibleEpisode(numberFieldValue);
          setisEditMode(false);
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
    )) || <Button onClick={() => setisEditMode(true)}>{lastAvaibleEpisode}</Button>
  );
}
