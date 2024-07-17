import { RenderMode } from "@/enums/RenderMode"
import { ViewMode } from "@/enums/ViewMode"
import usePagination from "@/hooks/usePagination"
import { useMemo, useState, type PropsWithChildren } from "react"
import DisplayAnimeContext from "./DisplayAnimeContext"

const DisplayAnimeProvider = ({ children }: PropsWithChildren) => {
  const [selectedViewMode, setSelectedViewMode] = useState(ViewMode.DEFAULT)
  const [selectedRenderMode, setSelectedRenderMode] = useState(RenderMode.CARD)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(Array<string>(0))
  const defaultPagination = usePagination([], 50)
  const [pagination, setPagination] = useState(defaultPagination)

  const contextValue = useMemo(
    () => ({
      selectedViewMode,
      setSelectedViewMode,
      selectedRenderMode,
      setSelectedRenderMode,
      selectedGenres,
      setSelectedGenres,
      pagination,
      setPagination
    }),
    [
      selectedViewMode,
      setSelectedViewMode,
      selectedRenderMode,
      setSelectedRenderMode,
      selectedGenres,
      setSelectedGenres,
      pagination,
      setPagination
    ]
  )

  return <DisplayAnimeContext.Provider value={contextValue}>{children}</DisplayAnimeContext.Provider>
}

export default DisplayAnimeProvider
