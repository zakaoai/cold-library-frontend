import { Dispatch, SetStateAction } from "react"

export default interface AnimeCardTrackedButton {
  isAnimeTracked: boolean
  trackAnime: Dispatch<SetStateAction<boolean>>
}
