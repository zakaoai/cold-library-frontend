import { Dispatch, SetStateAction } from "react"
import { AnimeEpisodeTorrentDTO } from "../services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import { type AnimeDTO } from "../services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "../services/AnimeTorrentService/AnimeTorrentDTO"

export default interface AppContext {
  animeLibrary: AnimeDTO[]
  setAnimeLibrary: Dispatch<SetStateAction<AnimeDTO[]>>
  torrentLibrary: AnimeTorrentDTO[]
  setTorrentLibrary: Dispatch<SetStateAction<AnimeTorrentDTO[]>>
  torrentEpisodeLibrary: AnimeEpisodeTorrentDTO[]
  setTorrentEpisodeLibrary: Dispatch<SetStateAction<AnimeEpisodeTorrentDTO[]>>
}
