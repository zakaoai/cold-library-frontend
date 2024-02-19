import StorageState from "@/enums/StorageState"

export default interface HotColdSwitch {
  storageState: StorageState
  setStorageState: (state: StorageState) => void
}
