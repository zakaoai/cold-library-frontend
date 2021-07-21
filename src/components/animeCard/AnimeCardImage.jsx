import React from "react";
import { CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

function AnimeCardImage({ url, imageUrl, title, imageHeight = "190px" }) {
  return (
    (imageUrl && (
      <a href={url}>
        <CardMedia component={"img"} style={{ maxHeight: imageHeight }} src={imageUrl} title={title} />
      </a>
    )) || <Skeleton animation="wave" variant="rect" height={190} />
  );
}

export default AnimeCardImage;
