import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { green, red } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import useAnimeLibrary from "~/hooks/useAnimeLibrary";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    height: "100%",
    paddingTop: "100%", // 16:9
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function AnimeCard({ malId, title, url, imageUrl, type, episodes }) {
  const classes = useStyles();
  const { anime, isFetching, doFetch, saveAnime, deleteAnime } = useAnimeLibrary(malId);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="type" className={classes.avatar} title={type}>
            {type.substring(0, 3)}
          </Avatar>
        }
        title={title}
        subheader={`Nb Episodes : ${episodes}`}
      />
      <CardMedia className={classes.media} image={imageUrl} title={title} onClick={() => (location.href = url)} />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to server"
          title="Ajouter au Server"
          onClick={() => (anime != undefined && deleteAnime()) || saveAnime()}
          style={(anime != undefined && { color: red[500] }) || {}}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
