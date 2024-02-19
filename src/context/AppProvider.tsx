import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type AnimeTorrentDTO } from "@/interfaces/services/AnimeTorrentService/AnimeTorrentDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AppContext from "./AppContext"

const AppProvider = ({ children }: PropsWithChildren) => {
  const [animeLibrary, setAnimeLibrary] = useState<AnimeDTO[]>([])
  const [torrentLibrary, setTorrentLibrary] = useState<AnimeTorrentDTO[]>([])

  const contextValue = useMemo(
    () => ({
      animeLibrary,
      setAnimeLibrary,
      torrentLibrary,
      setTorrentLibrary
    }),
    [animeLibrary, torrentLibrary]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppProvider
