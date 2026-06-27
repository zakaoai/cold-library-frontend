import RequestButton from "@/components/RequestButton/RequestButton"
import useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import CardActions from "@mui/material/CardActions"
import Grid from "@mui/material/Grid"

import AnimeCardTrackedButton from "@/components/AnimeCardTrackedButton/AnimeCardTrackedButton"
import AnimeCompleteButton from "@/components/AnimeCompleteButton/AnimeCompleteButton"
import useUpdateAnimeStorageState from "@/hooks/components/useUpdateAnimeStorageState"

import InLibraryStateButtonGeneric from "@/components/InLibraryStateButtonGeneric/InLibraryStateButtonGeneric"
import LastAvaibleEpisode from "@/components/LastAvaibleEpisode/LastAvaibleEpisode"
import withAuthorization from "@/components/Secure/withAuthorization"
import type IAnimeCardReadEpisodeBottomAction from "@/interfaces/containers/Activite/AnimeEpisode/AnimeCardReadBottomAction"

const AnimeCardReadEpisodeBottomAction = ({
  showAddOrRemoveFromLibrary = false,
  request,
  createRequest,
  updateAnime,
  anime
}: IAnimeCardReadEpisodeBottomAction) => {
  const { episodes, storageState, isComplete, isDownloading } = anime
  const isInLibrary = !(storageState === undefined || storageState === null)

  const defaultAnime = {
    ...anime,
    storageState: undefined,
    isDownloading: undefined,
    isComplete: undefined,
    lastAvaibleEpisode: undefined,
    addedOnServer: undefined
  }

  const updateAnimeState = useUpdateAnimeState(anime.malId, defaultAnime, updateAnime)
  const { setIsComplete, isUpdateIsCompletePending, setIsDownloading } = updateAnimeState

  const { updateAnime: updateAnimeStorageState } = useUpdateAnimeStorageState(updateAnime)

  const SecuredAddOrRemoveFromLibrary = withAuthorization(
    () => <InLibraryStateButtonGeneric anime={anime} updateAnime={updateAnimeStorageState} />,
    { minLevel: "admin" }
  )

  return (
    <CardActions disableSpacing>
      <Grid container sx={{ alignItems: "center" }}>
        {showAddOrRemoveFromLibrary && (
          <Grid size={{ xs: 2 }}>
            <SecuredAddOrRemoveFromLibrary />
          </Grid>
        )}
        {isInLibrary && (
          <>
            <Grid size={{ xs: 2 }}>
              <AnimeCompleteButton
                nbEpisodes={episodes}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                isCompletePending={isUpdateIsCompletePending}
              />
            </Grid>
            <Grid size={{ xs: 3 }}>
              <LastAvaibleEpisode anime={anime} updateAnimeState={updateAnimeState} />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <AnimeCardTrackedButton isAnimeTracked={isDownloading ?? false} trackAnime={setIsDownloading} />
            </Grid>
          </>
        )}
        <Grid size={{ xs: 2 }}>
          <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
        </Grid>
      </Grid>
    </CardActions>
  )
}

export default AnimeCardReadEpisodeBottomAction
