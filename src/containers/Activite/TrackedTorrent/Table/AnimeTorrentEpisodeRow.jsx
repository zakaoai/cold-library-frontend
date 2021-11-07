import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { DateTime } from "luxon";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";

export default function AnimeTorrentEpisodeRow({ animeEpisodeTorrent, searchAlternate }) {
  const { episodeNumber, title, date, torrentLink, torrentId, displaySize, leechers, seeders, completed } =
    animeEpisodeTorrent;

  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow key={animeEpisodeTorrent.torrentId}>
      <TableCell component="th" scope="row">
        {episodeNumber}
      </TableCell>
      <TableCell>
        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
          <Typography>{title}</Typography>
        </div>
      </TableCell>
      <TableCell align="right">
        {date && DateTime.fromObject({ year, month, day }).setLocale("fr").toFormat("dd LLL yyyy")}
      </TableCell>
      <TableCell component="th" scope="row">
        {displaySize}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="search alternate" onClick={() => searchAlternate(animeEpisodeTorrent)} size="large">
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="download" href={torrentLink} alt={`Download Torrent ${torrentId}`} size="large">
          <GetAppIcon />
        </IconButton>
        <IconButton aria-label="torrent info" href={nyaaLink} alt={`Infos Torrent ${torrentId}`} size="large">
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
