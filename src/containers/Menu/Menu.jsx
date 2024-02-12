import SiteMap from "@/routes/SiteMap"

import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile/MenuMobile"

/**
 * Menu de l'application
 */
const Menu = () => {
  const links = [SiteMap.ACCUEIL, SiteMap.RECHERCHE, SiteMap.LIBRAIRIE, SiteMap.TORRENT]

  return (
    <>
      <MenuDesktop links={links} />
      <MenuMobile links={links} location={location} />
    </>
  )
}

export default Menu
