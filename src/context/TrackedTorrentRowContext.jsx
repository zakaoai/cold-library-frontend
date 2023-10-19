import { createContext, useContext, useMemo } from "react";

const TrackedTorrentRowContext = createContext(null);

export const TrackedTorrentRowProvider = ({ children, value }) => {
  const contextValue = useMemo(() => ({ ...value }), [value]);

  return <TrackedTorrentRowContext.Provider value={contextValue}>{children}</TrackedTorrentRowContext.Provider>;
};

export const useTrackedTorrentRowContext = () => {
  const context = useContext(TrackedTorrentRowContext);
  if (context === undefined) {
    throw new Error("useTrackedTorrentRowContext must be used within a TrackedTorrentRowProvider");
  }
  return context;
};
