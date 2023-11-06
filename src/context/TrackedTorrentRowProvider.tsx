import ITrackedTorrentRowContext from "@/interfaces/contexts/TrackedTorrentRowContext";
import { PropsWithChildren, useMemo } from "react";
import TrackedTorrentRowContext from "./TrackedTorrentRowContext";

export const TrackedTorrentRowProvider = ({
  children,
  value
}: PropsWithChildren & { value: ITrackedTorrentRowContext }) => {
  const contextValue = useMemo(() => ({ ...value }), [value]);

  return <TrackedTorrentRowContext.Provider value={contextValue}>{children}</TrackedTorrentRowContext.Provider>;
};
