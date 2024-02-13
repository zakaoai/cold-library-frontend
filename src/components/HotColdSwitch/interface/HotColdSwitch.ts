import StorageState from "@/enums/StorageState"
import { Dispatch, SetStateAction } from "react"

export default interface HotColdSwitch {
  storageState: StorageState
  setStorageState: Dispatch<SetStateAction<StorageState>>
}
