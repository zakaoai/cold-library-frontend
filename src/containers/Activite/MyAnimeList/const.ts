import { blue, green, grey, red, yellow } from "@mui/material/colors"

export const DEFAULT_STATUS = "ALL"
export const statusValues = [
  { value: "ALL", label: "Tous" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
  { value: "plan_to_watch", label: "Plan To Watch" }
]

export const backgroundByStatus: Record<string, string> = {
  watching: green[500],
  completed: blue[500],
  on_hold: yellow[500],
  dropped: red[500],
  plan_to_watch: grey[500],
  unknown: green[50]
}
