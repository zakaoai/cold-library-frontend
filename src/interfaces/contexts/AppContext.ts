import type { Dispatch, SetStateAction } from "react"
import type { AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import type { AnimeDTO } from "../services/AnimeService/AnimeDTO"
import type UserDTO from "../services/UserService/UserDTO"

export default interface AppContext {
  animeLibrary: AnimeDTO[]
  setAnimeLibrary: Dispatch<SetStateAction<AnimeDTO[]>>
  torrentEpisodeLibrary: AnimeEpisodeTorrentDTO[]
  setTorrentEpisodeLibrary: Dispatch<SetStateAction<AnimeEpisodeTorrentDTO[]>>
  user: UserDTO | undefined
  setUser: Dispatch<SetStateAction<UserDTO | undefined>>
}
