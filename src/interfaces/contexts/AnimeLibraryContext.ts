import { type RenderMode } from "@/enums/RenderMode"
import { type ViewMode } from "@/enums/ViewMode"
import type usePagination from "@/hooks/usePagination"
import { type Dispatch, type SetStateAction } from "react"

export default interface AnimeLibraryContext {
  selectedViewMode: ViewMode
  setSelectedViewMode: Dispatch<SetStateAction<ViewMode>>
  selectedRenderMode: RenderMode
  setSelectedRenderMode: Dispatch<SetStateAction<RenderMode>>
  pagination: ReturnType<typeof usePagination>
}
