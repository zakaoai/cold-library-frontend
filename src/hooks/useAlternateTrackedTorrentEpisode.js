import { useTrackedTorrentRowContext } from "context/TrackedTorrentRowContext";
import AnimeTorrentEpisodeService from "services/AnimeTorrentEpisodeService";
import { formatByteSize, getBytesSize } from "utils/byteSize";

const { useState, useEffect } = require("react");

const useAlternateTrackedTorrentEpisode = (trackedEpisode, handleClose) => {
  const { patchTrackedAnimeEpisode: updateTrackedEpisode } = useTrackedTorrentRowContext();
  const [trackedEpisodeAlternates, setTrackedEpisodeAlternates] = useState([]);

  const [selectedValue, setSelectedValue] = useState(undefined);

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const handleModifier = () => {
    if (selectedValue) {
      updateTrackedEpisode(trackedEpisodeAlternates.find(ep => ep.torrentId == selectedValue));
      handleClose();
    }
  };

  const { malId, episodeNumber } = trackedEpisode;

  useEffect(() => {
    AnimeTorrentEpisodeService.searchAlternateEpisodeTorrent(malId, episodeNumber).then(list =>
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

  return { handleChange, handleModifier, alternateTrackedEpisodes: trackedEpisodeAlternatesWithSize, selectedValue };
};

export default useAlternateTrackedTorrentEpisode;
