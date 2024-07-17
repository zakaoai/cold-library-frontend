import type { Dispatch, SetStateAction } from "react"
import type MALAnimeAnimeDTO from "../containers/Activite/MyAnimeList/MALAnimeAnimeDTO"

export default interface MyAnimeListContext {
  userStatusFilter: string
  setuserStatusFilter: Dispatch<SetStateAction<string>>
  myAnimeList: MALAnimeAnimeDTO[]
  setMyAnimeList: Dispatch<SetStateAction<MALAnimeAnimeDTO[]>>
}
