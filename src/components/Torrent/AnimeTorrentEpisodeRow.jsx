import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { DateTime } from "luxon";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import formatByteSize from "~/utils/byteSize";
import SearchIcon from "@material-ui/icons/Search";

export default function AnimeTorrentEpisodeRow({ animeEpisodeTorrent, searchAlternate }) {
  const {
    episodeNumber,
    title,
    date,
    torrentLink,
    torrentId,
    torrentSize,
    leechers,
    seeders,
    completed
  } = animeEpisodeTorrent;

  const [size, sizeType] = torrentSize.split(" ");

  const [year, month, day] = date;
  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow key={animeEpisodeTorrent.torrentId}>
      <TableCell component="th" scope="row">
        {episodeNumber}
      </TableCell>
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
      <TableCell align="right">
        <IconButton aria-label="scan" onClick={() => searchAlternate(episodeNumber)}>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="delete" href={torrentLink}>
          <GetAppIcon />
        </IconButton>
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
