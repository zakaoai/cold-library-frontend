import AnimeCardTrackedButton from "@/components/AnimeCardTrackedButton/AnimeCardTrackedButton"
import AnimeCompleteButton from "@/components/AnimeCompleteButton/AnimeCompleteButton"
import HotColdSwitch from "@/components/HotColdSwitch/HotColdSwitch"
import InLibraryButton from "@/components/InLibraryButton/InLibraryButton"
import withAuthorization from "@/components/Secure/withAuthorization"
import { Grid } from "@mui/material"

const AdminActions = ({
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
}: any) =>
  renderRow ? (
    <>
      <InLibraryButton anime={anime} updateAnimeState={updateAnimeState} />
      {storageState !== undefined ? (
        <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
      ) : undefined}
      <AnimeCompleteButton
        nbEpisodes={episodes}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        isCompletePending={isUpdateIsCompletePending}
      />
      <AnimeCardTrackedButton isAnimeTracked={isDownloading ?? false} trackAnime={setIsDownloading} />
    </>
  ) : (
    <>
      <Grid size={{ xs: 2 }}>
        <InLibraryButton anime={anime} updateAnimeState={updateAnimeState} />
      </Grid>
      <Grid size={{ xs: 3 }}>
        {storageState !== undefined ? (
          <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
        ) : undefined}
      </Grid>
      <Grid size={{ xs: 2 }}>
        <AnimeCompleteButton
          nbEpisodes={episodes}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          isCompletePending={isUpdateIsCompletePending}
        />
      </Grid>
      <Grid size={{ xs: 2 }}>
        <AnimeCardTrackedButton isAnimeTracked={isDownloading ?? false} trackAnime={setIsDownloading} />
      </Grid>
    </>
  )

export const ProtectedAdminActions = withAuthorization(AdminActions, { minLevel: "admin" })
