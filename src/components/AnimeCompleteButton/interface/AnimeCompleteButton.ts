export default interface AnimeCompleteButton {
  nbEpisodes?: number
  isComplete?: boolean
  setIsComplete: (isComplete: boolean) => void
  isCompletePending?: boolean
}
