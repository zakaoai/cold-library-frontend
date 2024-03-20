import SiteMap from "@/routes/SiteMap"

import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile/MenuMobile"

/**
 * Menu de l'application
 */
const Menu = () => {
  const links = [
    SiteMap.ACCUEIL,
    SiteMap.RECHERCHE,
    SiteMap.LIBRAIRIE,
    SiteMap.TORRENT,
    SiteMap.ANIME,
    SiteMap.MYANIMELIST
  ]

  return (
    <>
      <MenuDesktop links={links} />
      <MenuMobile links={links} />
    </>
  )
}

export default Menu
