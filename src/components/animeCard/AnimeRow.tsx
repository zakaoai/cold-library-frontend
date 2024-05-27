import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import HotColdSwitch from "../HotColdSwitch/HotColdSwitch"
import AnimeCardTrackedButton from "./AnimeCardTrackedButton"
import AnimeCompleteButton from "./AnimeCompleteButton"
import InLibraryButton from "./InLibraryButton"
import LastAvaibleEpisode from "./LastAvaibleEpisode"
import { useAnimeCardContext } from "./hooks/useAnimeCardContext"

const AnimeRow = () => {
  const { anime, showAddOrRemoveFromLibrary, updateAnimeState } = useAnimeCardContext()
  const { title, malImg, episodes, type, storageState, isComplete, isDownloading } = anime
  const { setIsComplete, isUpdateIsCompletePending, setStorageState, setIsDownloading } = updateAnimeState
  const isInLibrary = !(storageState === undefined || storageState === null)

  return (
    <>
      <TableRow>
        <TableCell>
          <img srcSet={`${malImg} 318w`} sizes="70px" alt={title} loading="lazy" />
        </TableCell>
        <TableCell sx={{ width: { lg: "440px" }, maxWidth: "440px" }}>
          {title} <br /> Nb Episodes : {episodes}
        </TableCell>
        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
          {type?.toUpperCase()}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          {showAddOrRemoveFromLibrary && <InLibraryButton />}
          {isInLibrary && (
            <>
              <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
              <AnimeCompleteButton
                nbEpisodes={episodes}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                isCompletePending={isUpdateIsCompletePending}
              />
              <LastAvaibleEpisode />
              <AnimeCardTrackedButton isAnimeTracked={isDownloading ?? false} trackAnime={setIsDownloading} />
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
        <TableCell colSpan={2} align="center">
          {type?.toUpperCase()}
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
        <TableCell colSpan={3}>
          {showAddOrRemoveFromLibrary && <InLibraryButton />}
          {isInLibrary && (
            <>
              <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
              <AnimeCompleteButton
                nbEpisodes={episodes}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                isCompletePending={isUpdateIsCompletePending}
              />
              <LastAvaibleEpisode />
              <AnimeCardTrackedButton isAnimeTracked={isDownloading ?? false} trackAnime={setIsDownloading} />
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default AnimeRow
