import type TrackedTorrentRowContext from "@/interfaces/contexts/TrackedTorrentRowContext";
import { createContext, useMemo } from "react";

export const TrackedTorrentRowContext = createContext<TrackedTorrentRowContext>(null);

export const TrackedTorrentRowProvider = ({ children, value }) => {
  const contextValue = useMemo(() => ({ ...value }), [value]);

  return <TrackedTorrentRowContext.Provider value={contextValue}>{children}</TrackedTorrentRowContext.Provider>;
};
