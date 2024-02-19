import { Dispatch, SetStateAction } from "react"
import { type AnimeDTO } from "../services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface AppContext {
  animeLibrary: AnimeDTO[]
  setAnimeLibrary: Dispatch<SetStateAction<AnimeDTO[]>>
  torrentLibrary: AnimeTorrentDTO[]
  setTorrentLibrary: Dispatch<SetStateAction<AnimeTorrentDTO[]>>
}
