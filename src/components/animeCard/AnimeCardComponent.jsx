import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import AnimeCardImage from "./AnimeCardImage";
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber";
import AnimeCardTitle from "./AnimeCardTitle";
import AnimeCardAvatar from "./AnimeCardAvatar";
import AnimeCardHeaderActions from "./AnimeCardHeaderActions";
import AnimeCardBottomActions from "./AnimeCardBottomActions";

export default function AnimeCardComponent({
  anime,
  showEpisodeLink,
  updateAnimeState,
  imageHeight,
  showAddOrRemoveFromLibrary = true
}) {
  const { malId, title, url, imageUrl, type, nbEpisodes } = anime || {};

  return (
    <Card>
      <CardHeader
        sx={{ height: "100px" }}
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
