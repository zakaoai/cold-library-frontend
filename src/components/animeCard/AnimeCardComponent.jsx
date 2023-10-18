import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import AnimeCardAvatar from "./AnimeCardAvatar";
import AnimeCardBottomActions from "./AnimeCardBottomActions";
import AnimeCardEpisodeNumber from "./AnimeCardEpisodeNumber";
import AnimeCardHeaderActions from "./AnimeCardHeaderActions";
import AnimeCardImage from "./AnimeCardImage";
import AnimeCardTitle from "./AnimeCardTitle";

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
