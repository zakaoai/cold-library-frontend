import { useMenu } from "@/hooks/containers/Menu/useMenu"
import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile/MenuMobile"

/**
 * Menu de l'application
 */
const Menu = () => {
  const { links } = useMenu()

  return (
    <>
      <MenuDesktop links={links} />
      <MenuMobile links={links} />
    </>
  )
}

export default Menu
