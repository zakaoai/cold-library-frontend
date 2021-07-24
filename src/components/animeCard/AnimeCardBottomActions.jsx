import { Grid } from "@material-ui/core";
import React from "react";
import HotColdSwitch from "../HotColdSwitch/HotColdSwitch";
import AnimeCardTrackedButton from "./AnimeCardTrackedButton";
import AnimeCompleteButton from "./AnimeCompleteButton";
import InLibraryButton from "./InLibraryButton";
import LastAvaibleEpisode from "./LastAvaibleEpisode";

const AnimeCardBottomActions = ({ showAddOrRemoveFromLibrary, anime, updateAnimeState }) => {
  const { nbEpisodes, storageState, isComplete, lastAvaibleEpisode, trackedTorrent } = anime || {};
  const { deleteAnime, saveAnime, setIsComplete, setStorageState, setLastAvaibleEpisode, trackAnime } =
    updateAnimeState;
  const isInLibrary = !!storageState;

  return (
    <Grid container alignItems="center">
      {showAddOrRemoveFromLibrary && (
        <Grid item>
          <InLibraryButton saveAnime={saveAnime} deleteAnime={deleteAnime} isInLibrary={isInLibrary} />
        </Grid>
      )}
      {isInLibrary && (
        <>
          <Grid item>
            <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
          </Grid>
          <Grid item>
            <AnimeCompleteButton nbEpisodes={nbEpisodes} isComplete={isComplete} setIsComplete={setIsComplete} />
          </Grid>
          <Grid item xs={2}>
            <LastAvaibleEpisode lastAvaibleEpisode={lastAvaibleEpisode} setLastAvaibleEpisode={setLastAvaibleEpisode} />
          </Grid>
          <Grid item>
            <AnimeCardTrackedButton isAnimeTracked={trackedTorrent} trackAnime={trackAnime} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AnimeCardBottomActions;
