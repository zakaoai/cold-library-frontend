import type { Dispatch, SetStateAction } from "react"

export default interface ArrowCollapse {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
