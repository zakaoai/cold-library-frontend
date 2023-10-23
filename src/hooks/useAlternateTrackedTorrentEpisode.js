import { useTrackedTorrentRowContext } from "@/context/TrackedTorrentRowContext";
import AnimeEpisodeTorrentService from "@/services/AnimeEpisodeTorrentService";
import { formatByteSize, getBytesSize } from "@/utils/byteSize";
import { formatEpisode } from "@/utils/torrentEpisode";

import { useCallback, useEffect, useState } from "react";

const useAlternateTrackedTorrentEpisode = (trackedEpisode, handleClose) => {
  const { patchTrackedAnimeEpisode: updateTrackedEpisode, setEpisodes } = useTrackedTorrentRowContext();
  const [trackedEpisodeAlternates, setTrackedEpisodeAlternates] = useState([]);
  const [updatedTrackedEpisode, setUpdatedTrackedEpisode] = useState(trackedEpisode);

  const [selectedValue, setSelectedValue] = useState(undefined);

  const handleChange = useCallback(
    event => {
      setSelectedValue(event.target.value);
    },
    [setSelectedValue]
  );
  const handleModifier = useCallback(() => {
    if (selectedValue) {
      updateTrackedEpisode(trackedEpisodeAlternates.find(ep => ep.torrentId == selectedValue));
      handleClose();
    }
  }, [updateTrackedEpisode, selectedValue]);

  const { malId, episodeNumber } = trackedEpisode;

  useEffect(() => {
    AnimeEpisodeTorrentService.updateTorrent(malId, episodeNumber).then(episode => {
      setUpdatedTrackedEpisode(formatEpisode(episode));
      setEpisodes(episodes => episodes.map(ep => (ep.episodeNumber === episodeNumber ? formatEpisode(episode) : ep)));
    });

    AnimeEpisodeTorrentService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list =>
      setTrackedEpisodeAlternates(list.map(ep => ({ ...ep, date: new Date(ep.date) })))
    );
  }, [trackedEpisode]);

  const addSize = row => {
    const torrentSizeSplit = row.torrentSize.split(" ");
    const byteSize = getBytesSize(...torrentSizeSplit);
    const displaySize = formatByteSize(...torrentSizeSplit);

    return { ...row, byteSize, displaySize };
  };

  const trackedEpisodeAlternatesWithSize = trackedEpisodeAlternates.map(row => addSize(row));

  return {
    handleChange,
    handleModifier,
    alternateTrackedEpisodes: trackedEpisodeAlternatesWithSize,
    selectedValue,
    updatedTrackedEpisode
  };
};

export default useAlternateTrackedTorrentEpisode;
