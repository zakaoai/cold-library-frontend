import { type Dispatch, type SetStateAction } from "react"

export default interface ArrowCollapse {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
