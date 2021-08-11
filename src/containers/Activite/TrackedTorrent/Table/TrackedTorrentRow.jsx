import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AnimeTorrentEpisodeTable from "./AnimeTorrentEpisodeTable";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DayOfWeek from "~/constants/DayOfWeek";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function TrackedTorrentRow({ trackedTorrent, scanAnime, editTrackedAnime, searchAlternate }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const { torrents, title, dayOfRelease, lastAvaibleEpisode, searchWords, type, malId } = trackedTorrent;

  const searchAlternateTorrent = torrent => searchAlternate(malId, torrent);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>{torrents.length !== 0 && <ArrowCollapse open={open} setOpen={setOpen} />}</TableCell>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell component="th" scope="row">
          {type}
        </TableCell>
        <TableCell component="th" scope="row">
          {lastEpisodeOnServer}
        </TableCell>
        <TableCell component="th" scope="row">
          {searchWords}
        </TableCell>
        <TableCell component="th" scope="row">
          {DayOfWeek[dayOfRelease]}
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="scan" onClick={() => editTrackedAnime(trackedTorrent)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="scan" onClick={() => scanAnime(malId)}>
            <SearchIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {torrents.length !== 0 && (
        <AnimeTorrentEpisodeTable torrents={torrents} listOpen={open} searchAlternate={searchAlternateTorrent} />
      )}
    </>
  );
}

function ArrowCollapse({ open, setOpen }) {
  return (
    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
}
