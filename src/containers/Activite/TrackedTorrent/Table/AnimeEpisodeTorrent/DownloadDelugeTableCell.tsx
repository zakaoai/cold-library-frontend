import CircularProgressWithLabel from "@/components/CircularProgressWithLabel/CircularProgressWithLabel"
import useDownloadDelugeAction from "@/hooks/containers/TrackedTorrent/useDownloadDelugeAction"
import IDownloadDelugeTableCell from "@/interfaces/containers/Activite/TrackedTorrent/DownloadDelugeTableCell"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"

const DownloadDelugeTableCell = ({ animeEpisodeTorrent }: IDownloadDelugeTableCell) => {
  const { progress, malId, episodeNumber } = animeEpisodeTorrent
  const { downloadDeluge, isDownloadDelugeTorrentPending, isUpdateDelugeInformationPending, updateDelugeInformation } =
    useDownloadDelugeAction(malId, episodeNumber)
  return (
    <TableCell>
      {progress === null ? (
        <IconButton size="large" onClick={() => downloadDeluge()} disabled={isDownloadDelugeTorrentPending}>
          <WaterDropIcon />
        </IconButton>
      ) : (
        <CircularProgressWithLabel
          value={progress}
          onClick={() => updateDelugeInformation()}
          variant={isUpdateDelugeInformationPending ? "indeterminate" : "determinate"}
        />
      )}
    </TableCell>
  )
}

export default DownloadDelugeTableCell
