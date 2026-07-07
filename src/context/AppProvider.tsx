import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import { useMemo, useState, type PropsWithChildren } from "react"
import AppContext from "./AppContext"

const AppProvider = ({ children }: PropsWithChildren) => {
  const [animeLibrary, setAnimeLibrary] = useState<AnimeDTO[]>([])

  const [user, setUser] = useState<UserDTO | undefined>(undefined)

  const contextValue = useMemo(
    () => ({
      animeLibrary,
      setAnimeLibrary,

      user,
      setUser
    }),
    [animeLibrary, user]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppProvider
