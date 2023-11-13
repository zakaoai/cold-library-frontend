import type ITrackedTorrentRowContext from "@/interfaces/contexts/TrackedTorrentRowContext"
import { useMemo, type PropsWithChildren } from "react"
import TrackedTorrentRowContext from "./TrackedTorrentRowContext"

export const TrackedTorrentRowProvider = ({
  children,
  value
}: PropsWithChildren & { value: ITrackedTorrentRowContext }) => {
  const contextValue = useMemo(() => ({ ...value }), [value])

  return <TrackedTorrentRowContext.Provider value={contextValue}>{children}</TrackedTorrentRowContext.Provider>
}
