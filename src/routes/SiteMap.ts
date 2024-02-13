import ISiteMap from "@/interfaces/route/SiteMap"

const SiteMap: ISiteMap = {
  ACCUEIL: {
    path: "/app/home",
    label: "Accueil"
  },
  RECHERCHE: {
    path: "/app/search",
    label: "Recherche d'anime"
  },
  LIBRAIRIE: {
    path: "/app/library",
    label: "Ma librairie"
  },
  EPISODE: {
    path: "/app/anime/:malId",
    label: "Episode"
  },
  TORRENT: {
    path: "/app/torrent",
    label: "Mes Torrents"
  },
  PROFILE: {
    path: "/app/profile",
    label: "Mon Profil"
  },
  LOGOUT: {
    path: "/app/logout",
    label: "Logout"
  }
}

export default SiteMap
