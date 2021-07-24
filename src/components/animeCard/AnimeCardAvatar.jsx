import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: red[500]
  }
}));

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

export default AnimeCardAvatar;
