import type IAlternateTrackedEpisodeLine from "@/interfaces/containers/Activite/TrackedTorrent/Modal/AlternateTrackedEpisodeLine"
import LinkIcon from "@mui/icons-material/Link"
import { IconButton, Link, Radio, TableCell, TableRow } from "@mui/material"
import { DateTime } from "luxon"
import { useCallback, useRef } from "react"

const AlternateTrackedEpisodeLine = ({ trackedEpisode, selectedValue, handleChange }: IAlternateTrackedEpisodeLine) => {
  const { title, dateObj: date, torrentId, displaySize, leechers, seeders, completed } = trackedEpisode

  const nyaaLink = `https://nyaa.si/view/${torrentId}`

  const radioRef = useRef<HTMLButtonElement>(null)
  const onClickRow = useCallback(() => {
    radioRef?.current?.click()
  }, [])

  return (
    <TableRow hover={handleChange !== undefined} onClick={onClickRow}>
      {handleChange && (
        <TableCell component="th" scope="row">
          <Radio
            ref={radioRef}
            checked={selectedValue != undefined && parseInt(selectedValue) == torrentId}
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
        <Link href={nyaaLink} aria-label={`Infos Torrent ${torrentId}`}>
          <IconButton size="large">
            <LinkIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  )
}

export default AlternateTrackedEpisodeLine
