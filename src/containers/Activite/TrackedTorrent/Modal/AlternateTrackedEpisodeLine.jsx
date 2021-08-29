import React from "react";
import { IconButton, Radio, TableCell, TableRow } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { DateTime } from "luxon";

const AlternateTrackedEpisodeLine = ({ trackedEpisode, selectedValue, handleChange }) => {
  const { title, date, torrentId, displaySize, leechers, seeders, completed } = trackedEpisode;

  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow hover={!!handleChange} onClick={handleChange}>
      {handleChange && (
        <TableCell component="th" scope="row">
          <Radio
            checked={selectedValue == torrentId}
            onChange={handleChange}
            value={torrentId}
            name="trackedEpisode"
            inputProps={{ "aria-label": title }}
          />
        </TableCell>
      )}
      <TableCell>{title}</TableCell>
      <TableCell align="right">
        {date && DateTime.fromObject({ year, month, day }).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
      <TableCell component="th" scope="row">
        {displaySize}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
          <LinkIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AlternateTrackedEpisodeLine;
