import { useMyAnimeListContext } from "@/hooks/context/useMyAnimeListContext"
import { Chip } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { blue, green, grey, red, yellow } from "@mui/material/colors"
import type MALRowProps from "./interface/MALRowProps"

import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import MALInLibraryButton from "../MALCard/MALInLibraryButton"
import RequestButton from "../RequestButton/RequestButton"

const backgroundByStatus: Record<string, string> = {
  watching: green[500],
  completed: blue[500],
  on_hold: yellow[500],
  dropped: red[500],
  plan_to_watch: grey[500],
  unknown: green[50]
}

const MALRow = ({ malAnime }: MALRowProps) => {
  const { selectedGenres } = useMyAnimeListContext()
  const { createRequest, myOpenedRequestMap } = useMyRequest()

  return (
    <>
      <TableRow>
        <TableCell sx={{ background: backgroundByStatus[malAnime.userStatus], paddingX: "5px" }} padding="none" />
        <TableCell>
          <a href={`https://myanimelist.net/anime/${malAnime.id}`} target="_blank" rel="noreferrer">
            <img srcSet={`${malAnime.main_picture.medium} 318w`} sizes="70px" alt={malAnime.title} loading="lazy" />
          </a>
        </TableCell>
        <TableCell sx={{ width: { lg: "440px" }, maxWidth: "440px" }}>
          {malAnime.title} <br /> Nb Episodes : {malAnime.episodes}
        </TableCell>
        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
          {malAnime.type?.toUpperCase()}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          {malAnime.genres
            ?.toSorted((a, b) => a.name.localeCompare(b.name))
            ?.map(genre =>
              selectedGenres.includes(genre.name) ? (
                <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="filled" />
              ) : (
                <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="outlined" />
              )
            )}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          <MALInLibraryButton malAnime={malAnime} />
          <RequestButton
            request={myOpenedRequestMap[malAnime.malId]}
            createRequest={createRequest}
            animeInServer={malAnime}
          />
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
        <TableCell padding="none" />
        <TableCell align="center">{malAnime.type?.toUpperCase()}</TableCell>
        <TableCell>
          {malAnime.genres
            ?.toSorted((a, b) => a.name.localeCompare(b.name))
            ?.map(genre =>
              selectedGenres.includes(genre.name) ? (
                <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="filled" />
              ) : (
                <Chip key={`${malAnime.id}-${genre.id}`} label={genre.name} variant="outlined" />
              )
            )}
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
        <TableCell colSpan={3}>
          <MALInLibraryButton malAnime={malAnime} />
          <RequestButton
            request={myOpenedRequestMap[malAnime.malId]}
            createRequest={createRequest}
            animeInServer={malAnime}
          />
        </TableCell>
      </TableRow>
    </>
  )
}

export default MALRow
