import type { RenderMode } from "@/enums/RenderMode"

import type { MouseEvent as ReactMouseEvent } from "react"

export default interface RenderButtons {
  handleChangeRenderMode: (_: ReactMouseEvent<HTMLElement>, newRender?: RenderMode) => void
  selectedRenderMode: RenderMode
}
