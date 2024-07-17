import type { AnimeEpisodeTorrentDTO } from "@/interfaces/services/AnimeEpisodeTorrentService/AnimeEpisodeTorrentDTO"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type { AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import type RequestDTO from "@/interfaces/services/RequestService/RequestDTO"
import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AppContext from "./AppContext"

const AppProvider = ({ children }: PropsWithChildren) => {
  const [animeLibrary, setAnimeLibrary] = useState<AnimeDTO[]>([])
  const [torrentLibrary, setTorrentLibrary] = useState<AnimeTorrentDTO[]>([])
  const [torrentEpisodeLibrary, setTorrentEpisodeLibrary] = useState<AnimeEpisodeTorrentDTO[]>([])
  const [user, setUser] = useState<UserDTO | undefined>(undefined)
  const [myRequests, setMyRequests] = useState<RequestDTO[]>([])

  const contextValue = useMemo(
    () => ({
      animeLibrary,
      setAnimeLibrary,
      torrentLibrary,
      setTorrentLibrary,
      torrentEpisodeLibrary,
      setTorrentEpisodeLibrary,
      user,
      setUser,
      myRequests,
      setMyRequests
    }),
    [animeLibrary, myRequests, torrentEpisodeLibrary, torrentLibrary, user]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppProvider
