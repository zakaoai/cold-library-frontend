import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import AnimeCardImage from "./AnimeCardImage";
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber";
import AnimeCardTitle from "./AnimeCardTitle";
import AnimeCardAvatar from "./AnimeCardAvatar";
import AnimeCardHeaderActions from "./AnimeCardHeaderActions";
import AnimeCardBottomActions from "./AnimeCardBottomActions";

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
  const { malId, title, url, imageUrl, type, nbEpisodes } = anime || {};

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<AnimeCardAvatar type={type} />}
        action={<AnimeCardHeaderActions showEpisodeLink={showEpisodeLink} malId={malId} />}
        title={<AnimeCardTitle title={title} />}
        subheader={<AnimeCardEpisodeNumber nbEpisodes={nbEpisodes} />}
      />
      <AnimeCardImage url={url} imageUrl={imageUrl} title={title} imageHeight={imageHeight} />

      <CardActions disableSpacing>
        <AnimeCardBottomActions
          anime={anime}
          updateAnimeState={updateAnimeState}
          showAddOrRemoveFromLibrary={showAddOrRemoveFromLibrary}
        />
      </CardActions>
    </Card>
  );
}
