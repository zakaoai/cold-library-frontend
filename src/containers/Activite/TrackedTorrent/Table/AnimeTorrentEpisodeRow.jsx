import React, { useCallback } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { DateTime } from "luxon";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTrackedTorrentRowContext } from "context/TrackedTorrentRowContext";
import { useTrackedTorrentContext } from "context/TrackedTorrentContext";
import Link from "@mui/material/Link";
import TrackedAnimeTorrentService from "services/TrackedAnimeTorrentService";

export default function AnimeTorrentEpisodeRow({ animeEpisodeTorrent }) {
  const { episodeNumber, title, date, torrentLink, torrentId, displaySize, leechers, seeders, completed } =
    animeEpisodeTorrent;

  const { updateTrackedAnime } = useTrackedTorrentContext();

  const { setSelectedEpisodeAlternate, setShowModalAlternateEpisode, deleteTorrent, trackedTorrent } =
    useTrackedTorrentRowContext();

  const updateTrackedAnimeEpisode = useCallback(
    episodeNumber => {
      TrackedAnimeTorrentService.update(trackedTorrent.malId, {
        ...trackedTorrent,
        lastEpisodeOnServer: episodeNumber
      }).then(updatedAnime => updateTrackedAnime(updatedAnime));
    },
    [updateTrackedAnime]
  );

  const searchAlternate = torrent => {
    setSelectedEpisodeAlternate(torrent);
    setShowModalAlternateEpisode(true);
  };

  const nyaaLink = `https://nyaa.si/view/${torrentId}`;
  return (
    <TableRow key={animeEpisodeTorrent.torrentId}>
      <TableCell component="th" scope="row">
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            updateTrackedAnimeEpisode(episodeNumber);
          }}>
          {episodeNumber}
        </Link>
      </TableCell>
      <TableCell>
        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "25rem" }}>
          <Typography>{title}</Typography>
        </div>
      </TableCell>
      <TableCell align="right">{date && DateTime.fromJSDate(date).setLocale("fr").toFormat("dd LLL yyyy")}</TableCell>
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
        <IconButton aria-label="delete torrent episode" onClick={() => deleteTorrent(episodeNumber)} size="large">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
