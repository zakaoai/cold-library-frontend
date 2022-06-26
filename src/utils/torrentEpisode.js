import { formatByteSize, getBytesSize } from "./byteSize";

export const formatEpisode = ep => {
  const torrentSizeSplit = ep.torrentSize.split(" ");
  const byteSize = getBytesSize(...torrentSizeSplit);
  const displaySize = formatByteSize(...torrentSizeSplit);

  return { ...ep, byteSize, displaySize, date: new Date(ep.date) };
};
