import React from "react";
import { CardMedia } from "@mui/material";
import { Skeleton } from "@mui/material";

function AnimeCardImage({ url, imageUrl, title, imageHeight = "190px" }) {
  return (
    (imageUrl && (
      <a href={url}>
        <CardMedia component={"img"} style={{ maxHeight: imageHeight }} src={imageUrl} title={title} />
      </a>
    )) || <Skeleton animation="wave" variant="rectangular" height={190} />
  );
}

export default AnimeCardImage;
