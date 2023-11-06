import type TrackedTorrentRowContext from "@/interfaces/contexts/TrackedTorrentRowContext";
import { createContext } from "react";

const TrackedTorrentRowContext = createContext<TrackedTorrentRowContext>({});

export default TrackedTorrentRowContext;
