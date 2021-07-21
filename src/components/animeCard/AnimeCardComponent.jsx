import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Grid from "@material-ui/core/Grid";
import HotColdSwitch from "./HotColdSwitch";
import LastAvaibleEpisode from "./LastAvaibleEpisode";
import AnimeCompleteButton from "./AnimeCompleteButton";
import InLibraryButton from "./InLibraryButton";
import AnimeCardImage from "./AnimeCardImage";
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber";
import AnimeCardTitle from "./AnimeCardTitle";
import AnimeCardAvatar from "./AnimeCardAvatar";
import AnimeCardHeaderActions from "./AnimeCardHeaderActions";

const useStyles = makeStyles(() => ({
  root: {},

  header: {
    height: "100px"
  }
}));

export default function AnimeCardComponent({
  anime,
  showEpisodeLink,
  updateAnimeState,
  imageHeight,
  showAddOrRemoveFromLibrary = true
}) {
  const classes = useStyles();
  const {
    malId,
    title,
    url,
    imageUrl,
    type,
    nbEpisodes,
    storageState,
    isComplete,
    lastAvaibleEpisode,
    trackedTorrent
  } = anime || {};
  const { deleteAnime, saveAnime, setIsComplete, setStorageState, setLastAvaibleEpisode, trackAnime, unTrackAnime } =
    updateAnimeState;
  const isInLibrary = !!storageState;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<AnimeCardAvatar type={type} />}
        action={
          <AnimeCardHeaderActions
            showEpisodeLink={showEpisodeLink}
            malId={malId}
            isInLibrary={isInLibrary}
            isAnimeTracked={trackedTorrent}
            trackAnime={trackAnime}
            unTrackAnime={unTrackAnime}
          />
        }
        title={<AnimeCardTitle title={title} />}
        subheader={<AnimeCardEpisodeNumber nbEpisodes={nbEpisodes} />}
      />
      <AnimeCardImage url={url} imageUrl={imageUrl} title={title} imageHeight={imageHeight} />

      <CardActions disableSpacing>
        <Grid container alignItems="center">
          {showAddOrRemoveFromLibrary && (
            <Grid item xs={2}>
              <InLibraryButton saveAnime={saveAnime} deleteAnime={deleteAnime} isInLibrary={isInLibrary} />
            </Grid>
          )}
          {isInLibrary && (
            <>
              <Grid item xs={3}>
                <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
              </Grid>
              <Grid item xs={2}>
                <AnimeCompleteButton nbEpisodes={nbEpisodes} isComplete={isComplete} setIsComplete={setIsComplete} />
              </Grid>
              <Grid item xs={2}>
                <LastAvaibleEpisode
                  lastAvaibleEpisode={lastAvaibleEpisode}
                  setLastAvaibleEpisode={setLastAvaibleEpisode}
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
