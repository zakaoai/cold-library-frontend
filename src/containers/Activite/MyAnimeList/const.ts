export const DEFAULT_STATUS = "ALL"
export const statusValues = [
  { value: "ALL", label: "Tous" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
  { value: "plan_to_watch", label: "Plan To Watch" }
]

export enum ViewMode {
  DEFAULT = "DEFAULT",
  ALPHA = "ALPHA",
  SEASON = "SEASON"
}

export enum RenderMode {
  CARD = "CARD",
  LIST = "LIST"
}
