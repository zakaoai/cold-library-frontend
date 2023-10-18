import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";

function AnimeCardImage({ url, imageUrl, title, imageHeight = "190px" }) {
  return (
    (imageUrl && (
      <a href={url} target="_blank" rel="noreferrer">
        <CardMedia component={"img"} style={{ maxHeight: imageHeight }} src={imageUrl} title={title} />
      </a>
    )) || <Skeleton animation="wave" variant="rectangular" height={190} />
  );
}

export default AnimeCardImage;
