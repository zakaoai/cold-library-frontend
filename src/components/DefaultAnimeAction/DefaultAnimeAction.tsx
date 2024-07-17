import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import Grid from "@mui/material/Grid"

import RequestButton from "@/components/RequestButton/RequestButton"
import useUpdateAnimeListState from "@/hooks/components/useUpdateAnimeListState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { useMemo, type Dispatch, type SetStateAction } from "react"
import InLibraryStateButtonGeneric from "../InLibraryStateButtonGeneric/InLibraryStateButtonGeneric"

interface IDefaultAnimeAction<Anime> {
  anime: AnimeDTO
  setAnimeListState: Dispatch<SetStateAction<Anime[]>>
  renderRow?: boolean
}

const DefaultAnimeAction = <T extends AnimeDTO>({
  anime,
  setAnimeListState,
  renderRow = false
}: IDefaultAnimeAction<T>) => {
  const { createRequest, myOpenedRequestMap } = useMyRequest()
  const { updateAnime } = useUpdateAnimeListState(setAnimeListState)
  const request = useMemo(() => myOpenedRequestMap[anime.malId], [anime.malId, myOpenedRequestMap])

  return renderRow ? (
    <>
      <InLibraryStateButtonGeneric anime={anime} updateAnime={updateAnime} />
      <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
    </>
  ) : (
    <Grid container alignItems="center">
      <Grid size={{ xs: 2 }}>
        <InLibraryStateButtonGeneric anime={anime} updateAnime={updateAnime} />
      </Grid>
      <Grid size={{ xs: 2 }}>
        <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
      </Grid>
    </Grid>
  )
}

export default DefaultAnimeAction
