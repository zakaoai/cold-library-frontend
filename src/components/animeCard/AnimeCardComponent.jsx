import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red, green } from "@material-ui/core/colors";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotColdSwitch from "./HotColdSwitch";
import LastAvaibleEpisode from "./LastAvaibleEpisode";
import MoreIcon from "@material-ui/icons/More";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles(() => ({
  root: {},
  media: {
    cursor: "pointer",
    minHeight: 190
  },
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    height: "100px"
  }
}));

export default function AnimeCardComponent({ anime, showEpisodeLink, updateAnimeState }) {
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
  const {
    deleteAnime,
    saveAnime,
    setIsComplete,
    setStorageState,
    setLastAvaibleEpisode,
    trackAnime,
    unTrackAnime
  } = updateAnimeState;
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
      <AnimeCardImage url={url} imageUrl={imageUrl} title={title} />

      <CardActions disableSpacing>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <InLibraryAction saveAnime={saveAnime} deleteAnime={deleteAnime} isInLibrary={isInLibrary} />
          </Grid>
          {isInLibrary && (
            <>
              <Grid item xs={6}>
                <HotColdSwitch storageState={storageState} setStorageState={setStorageState} />
              </Grid>
              <Grid item xs={2}>
                <AnimeCompleteAction nbEpisodes={nbEpisodes} isComplete={isComplete} setIsComplete={setIsComplete} />
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

function AnimeCardHeaderActions({ showEpisodeLink, malId, isInLibrary, isAnimeTracked, trackAnime, unTrackAnime }) {
  return (
    <>
      {isInLibrary && (
        <TrackedAnimeAction isAnimeTracked={isAnimeTracked} trackAnime={trackAnime} unTrackAnime={unTrackAnime} />
      )}
      {showEpisodeLink && <AnimeCardLink malId={malId} />}
    </>
  );
}

function TrackedAnimeAction({ isAnimeTracked, trackAnime, unTrackAnime }) {
  return (
    <IconButton
      aria-label="Track or UnTrack Anime"
      title="Ajouter ou Supprimer l'anime à la liste des torrents suivie"
      onClick={() => (isAnimeTracked && unTrackAnime()) || trackAnime()}
      style={(isAnimeTracked && { color: green[500] }) || {}}>
      <CloudDownloadIcon />
    </IconButton>
  );
}

function AnimeCardAvatar({ type }) {
  const classes = useStyles();

  return (
    (type && (
      <Avatar aria-label="type" className={classes.avatar} title={type}>
        {type.substring(0, 3)}
      </Avatar>
    )) || <Skeleton animation="wave" variant="circle" width={40} height={40} />
  );
}

function AnimeCardLink({ malId }) {
  return (
    <IconButton component={Link} to={`/app/anime/${malId}`}>
      <MoreIcon />
    </IconButton>
  );
}

function AnimeCardTitle({ title }) {
  return title || <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />;
}

function AnimeCardEpisodeNumber({ nbEpisodes }) {
  return (
    (nbEpisodes !== undefined && `Nb Episodes : ${nbEpisodes}`) || (
      <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
    )
  );
}

function AnimeCardImage({ url, imageUrl, title }) {
  const classes = useStyles();

  return (
    (imageUrl && (
      <CardMedia
        component={"img"}
        className={classes.media}
        image={imageUrl}
        title={title}
        onClick={() => (location.href = url)}
      />
    )) || <Skeleton animation="wave" variant="rect" className={classes.media} />
  );
}

function InLibraryAction({ saveAnime, deleteAnime, isInLibrary }) {
  return (
    <IconButton
      aria-label="add or delete to server"
      title="Ajouter ou Supprimer du Server"
      onClick={() => (isInLibrary && deleteAnime()) || saveAnime()}
      style={(isInLibrary && { color: red[500] }) || {}}>
      <FavoriteIcon />
    </IconButton>
  );
}

function AnimeCompleteAction({ nbEpisodes, isComplete, setIsComplete }) {
  return (
    <IconButton
      aria-label="all Anime is complete"
      title="Set as Complete"
      disabled={nbEpisodes === 0}
      onClick={() => setIsComplete(!isComplete)}
      style={(isComplete && { color: green[500] }) || {}}>
      <DoneAllIcon />
    </IconButton>
  );
}
