import { Dispatch, SetStateAction } from "react"

export default interface AnimeCompleteButton {
  nbEpisodes: number
  isComplete: boolean
  setIsComplete: Dispatch<SetStateAction<boolean>>
  isCompletePending: boolean
}
