import { Chip } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

import { useMemo } from "react"
import type IAnimeRowRead from "./interface/AnimeRowRead"

const AnimeRowRead = ({ anime, beforeTableCell, actionTableCell, selectedGenres, imageHeight }: IAnimeRowRead) => {
  const { malId, title, malImg, episodes, type, genres } = anime

  const renderGenres = useMemo(
    () =>
      genres
        ?.toSorted((a, b) => a.name.localeCompare(b.name))
        .map(genre =>
          selectedGenres?.includes(genre.name) === true ? (
            <Chip key={`${malId}-${genre.id}`} label={genre.name} variant="filled" />
          ) : (
            <Chip key={`${malId}-${genre.id}`} label={genre.name} variant="outlined" />
          )
        ),
    [genres, malId, selectedGenres]
  )

  return (
    <>
      <TableRow>
        {beforeTableCell}
        <TableCell>
          <a href={`https://myanimelist.net/anime/${malId}`} target="_blank" rel="noreferrer">
            <img src={malImg} height={imageHeight ?? "70px"} alt={title} loading="lazy" />
          </a>
        </TableCell>
        <TableCell sx={{ width: { lg: "440px" }, maxWidth: "440px" }}>
          {title} <br /> Nb Episodes : {episodes}
        </TableCell>
        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
          {type?.toUpperCase()}
        </TableCell>
        {genres !== undefined ? (
          <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{renderGenres}</TableCell>
        ) : undefined}
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{actionTableCell}</TableCell>
      </TableRow>
      {genres !== undefined ? (
        <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
          {beforeTableCell !== undefined ? <TableCell padding="none" /> : undefined}
          <TableCell align="center">{type?.toUpperCase()}</TableCell>
          <TableCell>{renderGenres}</TableCell>
        </TableRow>
      ) : undefined}
      {actionTableCell !== undefined ? (
        <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
          <TableCell colSpan={beforeTableCell !== undefined ? 3 : 2}>{actionTableCell}</TableCell>
        </TableRow>
      ) : undefined}
    </>
  )
}

export default AnimeRowRead
