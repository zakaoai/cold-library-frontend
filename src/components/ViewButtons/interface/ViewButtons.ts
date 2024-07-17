import type { ViewMode } from "@/enums/ViewMode"
import type { MouseEvent as ReactMouseEvent } from "react"

export default interface ViewButtons {
  handleChangeViewMode: (_: ReactMouseEvent<HTMLElement>, newView?: ViewMode) => void
  selectedViewMode: ViewMode
}
