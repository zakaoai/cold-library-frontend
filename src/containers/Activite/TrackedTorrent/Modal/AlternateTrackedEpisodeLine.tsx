import type AlternateTrackedEpisodeLine from "@/interfaces/containers/Activite/TrackedTorrent/Modal/AlternateTrackedEpisodeLine"
import LinkIcon from "@mui/icons-material/Link"
import { IconButton, Radio, TableCell, TableRow } from "@mui/material"
import { DateTime } from "luxon"

const AlternateTrackedEpisodeLine = ({ trackedEpisode, selectedValue, handleChange }: AlternateTrackedEpisodeLine) => {
  const { title, dateObj: date, torrentId, displaySize, leechers, seeders, completed } = trackedEpisode

  const nyaaLink = `https://nyaa.si/view/${torrentId}`
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
      <TableCell align="right">{date && DateTime.fromJSDate(date).setLocale("fr").toFormat("dd LLL yyyy")}</TableCell>
      <TableCell component="th" scope="row">
        {displaySize}
      </TableCell>
      <TableCell component="th" scope="row">
        {leechers}/{seeders} ({completed})
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton aria-label="delete" href={nyaaLink} alt={`Infos Torrent ${torrentId}`} size="large">
          <LinkIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default AlternateTrackedEpisodeLine
