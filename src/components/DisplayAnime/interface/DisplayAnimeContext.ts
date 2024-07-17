import type { RenderMode } from "@/enums/RenderMode"
import type { ViewMode } from "@/enums/ViewMode"
import type usePagination from "@/hooks/usePagination"
import type { Dispatch, SetStateAction } from "react"

export default interface DisplayAnimeContext {
  selectedViewMode: ViewMode
  setSelectedViewMode: Dispatch<SetStateAction<ViewMode>>
  selectedRenderMode: RenderMode
  setSelectedRenderMode: Dispatch<SetStateAction<RenderMode>>
  selectedGenres: string[]
  setSelectedGenres: Dispatch<SetStateAction<string[]>>
  pagination: ReturnType<typeof usePagination>
  setPagination: Dispatch<SetStateAction<ReturnType<typeof usePagination>>>
}
