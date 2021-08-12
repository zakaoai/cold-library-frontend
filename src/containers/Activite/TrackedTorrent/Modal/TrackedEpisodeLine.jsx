import React from "react";
import { IconButton, Radio, TableCell, TableRow } from "@material-ui/core";
import formatByteSize from "~/utils/byteSize";
import InfoIcon from "@material-ui/icons/Info";
import { DateTime } from "luxon";

const TrackedEpisodeLine = ({ trackedEpisode, selectedValue, handleChange }) => {
  const { title, date, torrentId, torrentSize, leechers, seeders, completed } = trackedEpisode;

  const [size, sizeType] = torrentSize.split(" ");

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
        {formatByteSize(size, sizeType)}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TrackedEpisodeLine;
