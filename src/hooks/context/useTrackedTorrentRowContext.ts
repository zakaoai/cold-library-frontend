import TrackedTorrentRowContext from "@/context/TrackedTorrentRowContext";
import { useContext } from "react";

export const useTrackedTorrentRowContext = () => {
  const context = useContext(TrackedTorrentRowContext);
  if (context === undefined) {
    throw new Error("useTrackedTorrentRowContext must be used within a TrackedTorrentRowProvider");
  }
  return context;
};
