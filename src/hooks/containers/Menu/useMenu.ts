import useUserContext from "@/hooks/context/useUserContext"
import SiteMap from "@/routes/SiteMap"
import { useMemo } from "react"

export function useMenu() {
  const { isLoading, isAuthenticated, isAdmin } = useUserContext()

  const anonymousLinks = [SiteMap.ACCUEIL]

  const userLinks = [
    SiteMap.ACCUEIL,
    SiteMap.RECHERCHE,
    SiteMap.LIBRAIRIE,
    SiteMap.SEASON,
    SiteMap.REQUEST,
    SiteMap.MYANIMELIST,
    SiteMap.ANIME
  ]

  const adminlinks = [
    SiteMap.ACCUEIL,
    SiteMap.RECHERCHE,
    SiteMap.LIBRAIRIE,
    SiteMap.SEASON,
    SiteMap.REQUEST,
    SiteMap.MYANIMELIST,
    SiteMap.TORRENT,
    SiteMap.ADMIN_LOG,
    SiteMap.ANIME
  ]

  return useMemo(() => {
    if (!isLoading && !isAuthenticated) {
      // Utilisateur non connecté
      return { links: anonymousLinks, loading: false }
    }
    if (!isLoading && isAuthenticated && isAdmin) {
      // Admin connecté
      return { links: adminlinks, loading: false }
    }
    // Utilisateur connecté non admin
    return { links: userLinks, loading: isLoading }
  }, [isLoading, isAuthenticated, isAdmin])
}
