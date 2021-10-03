import React from "react";
import { Avatar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";
import { red } from "@mui/material/colors";

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
    )) || <Skeleton animation="wave" variant="circular" width={40} height={40} />
  );
}

export default AnimeCardAvatar;
