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

import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotColdSwitch from "./HotColdSwitch";
import LastAvaibleEpisode from "./LastAvaibleEpisode";
import MoreIcon from "@material-ui/icons/More";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    height: "100px"
  }
}));

export default function AnimeCard({
  malId,
  title,
  url,
  imageUrl,
  type,
  nbEpisodes,
  storageState,
  isComplete,
  lastAvaibleEpisode
}) {
  const classes = useStyles();
  const {
    anime,
    isFetching,
    doFetch,
    saveAnime,
    deleteAnime,
    doSwapStorageState,
    doSwapIsComplete,
    setLastAvaibleEpisode
  } = useAnimeLibrary(malId, storageState);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="type" className={classes.avatar} title={type}>
            {type.substring(0, 3)}
          </Avatar>
        }
        action={
          <IconButton component={Link} to={`/app/anime/${malId}`}>
            <MoreIcon />
          </IconButton>
        }
        title={title}
        subheader={`Nb Episodes : ${nbEpisodes}`}
      />

      <CardMedia
        component={"img"}
        className={classes.media}
        image={imageUrl}
        title={title}
        onClick={() => (location.href = url)}
      />

      <CardActions disableSpacing>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <IconButton
              aria-label="add or delete to server"
              title="Ajouter ou Supprimer du Server"
              onClick={() => (anime != undefined && deleteAnime()) || saveAnime()}
              style={(anime != undefined && { color: red[500] }) || {}}>
              <FavoriteIcon />
            </IconButton>
          </Grid>
          {anime != undefined && (
            <>
              <Grid item xs={6}>
                <HotColdSwitch
                  isFluxFroid={anime.storageState === "FLUX_FROID"}
                  doSwapStorageState={doSwapStorageState}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  aria-label="all Anime is complete"
                  title="Set as Complete"
                  disabled={anime === undefined || anime.nbEpisodes === 0}
                  onClick={() => doSwapIsComplete()}
                  style={(anime.isComplete && { color: green[500] }) || {}}>
                  <DoneAllIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <LastAvaibleEpisode
                  lastAvaibleEpisode={anime.lastAvaibleEpisode}
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
