import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import { useMemo, useState, type PropsWithChildren } from "react"
import AnimeLibraryContext from "./AnimeLibraryContext"

const AnimeLibraryProvider = ({ children }: PropsWithChildren) => {
  const [selectedViewMode, setSelectedViewMode] = useState(ViewMode.DEFAULT)
  const [selectedRenderMode, setSelectedRenderMode] = useState(RenderMode.CARD)

  const contextValue = useMemo(
    () => ({
      selectedViewMode,
      setSelectedViewMode,
      selectedRenderMode,
      setSelectedRenderMode
    }),
    [selectedViewMode, setSelectedViewMode, selectedRenderMode, setSelectedRenderMode]
  )

  return <AnimeLibraryContext.Provider value={contextValue}>{children}</AnimeLibraryContext.Provider>
}

export default AnimeLibraryProvider
