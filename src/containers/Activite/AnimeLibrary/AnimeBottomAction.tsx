import RequestButton from "@/components/RequestButton/RequestButton"
import useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import CardActions from "@mui/material/CardActions"
import Grid from "@mui/material/Grid"

import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"
import useAppContext from "@/hooks/context/useAppContext"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import { useCallback, useMemo } from "react"
import { ProtectedAdminActions } from "./AdminActions"

interface IAnimeBottomAction {
  anime: AnimeDTO
  renderRow?: boolean
}

const AnimeBottomAction = ({ anime, renderRow = false }: IAnimeBottomAction) => {
  const { episodes, storageState, isComplete, isDownloading } = anime

  const { createRequest, myOpenedRequestMap } = useMyRequest()
  const request = useMemo(() => myOpenedRequestMap[anime.malId], [anime.malId, myOpenedRequestMap])

  const defaultAnime = {
    ...anime,
    storageState: undefined,
    isDownloading: undefined,
    isComplete: undefined,
    lastAvaibleEpisode: undefined,
    addedOnServer: undefined
  }

  const { setAnimeLibrary } = useAppContext()

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      setAnimeLibrary(animes =>
        animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
      )
    },
    [setAnimeLibrary]
  )

  const updateAnimeState = useUpdateAnimeState(anime.malId, defaultAnime, updateAnime)
  const { setStorageState, setIsComplete, isUpdateIsCompletePending, setIsDownloading } = updateAnimeState

  return renderRow ? (
    <>
      <ProtectedAdminActions
        {...{
          anime,
          storageState,
          setStorageState,
          episodes,
          isComplete,
          setIsComplete,
          isUpdateIsCompletePending,
          isDownloading,
          setIsDownloading,
          updateAnimeState,
          renderRow
        }}
      />

      <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
    </>
  ) : (
    <CardActions disableSpacing>
      <Grid container alignItems="center">
        <ProtectedAdminActions
          {...{
            anime,
            storageState,
            setStorageState,
            episodes,
            isComplete,
            setIsComplete,
            isUpdateIsCompletePending,
            isDownloading,
            setIsDownloading,
            updateAnimeState,
            renderRow
          }}
        />
        <Grid size={{ xs: 2 }}>
          <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
        </Grid>
      </Grid>
    </CardActions>
  )
}

export default AnimeBottomAction
